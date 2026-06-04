#!/bin/bash

# CultureHQ Widget Deployment Script
# This script builds the widget and deploys it to S3 with CloudFront cache invalidation

set -e  # Exit on any error

# Configuration
S3_BUCKET="culturehq-assets"
CLOUDFRONT_DISTRIBUTION_ID="E189Z1LC7CKQNR"
BUILD_DIR="dist"
BUILD_FILE="main.js"

# List of widget files to update
WIDGET_FILES=(
    "widget_1641918528.js"
    "widget_1641924192.js"
    "widget_1642430910.js"
    "widget_1642435178.js"
    "widget_1644601906.js"
    "widget_1653338154.js"
    "widget_1682098241.js"
    "widget_1689030416.js"
)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "webpack.config.babel.js" ]; then
    log_error "Please run this script from the widget directory"
    exit 1
fi

# Check if AWS CLI is installed and configured
if ! command -v aws &> /dev/null; then
    log_error "AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null; then
    log_error "AWS credentials not configured. Please run 'aws configure'"
    exit 1
fi

log_info "Starting widget deployment..."

# Step 1: Clean and build
log_info "Cleaning and building widget..."
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
    log_info "Cleaned existing build directory"
fi

npm run build
if [ $? -eq 0 ]; then
    log_success "Widget built successfully"
else
    log_error "Build failed"
    exit 1
fi

# Check if build file exists
if [ ! -f "$BUILD_DIR/$BUILD_FILE" ]; then
    log_error "Build file $BUILD_DIR/$BUILD_FILE not found"
    exit 1
fi

# Step 2: Upload to S3
log_info "Uploading widget files to S3..."
upload_count=0
failed_uploads=()

for widget_file in "${WIDGET_FILES[@]}"; do
    log_info "Uploading $widget_file..."
    if aws s3 cp "$BUILD_DIR/$BUILD_FILE" "s3://$S3_BUCKET/$widget_file" \
        --cache-control "no-cache, must-revalidate" \
        --content-type "application/javascript" \
        --metadata-directive REPLACE; then
        log_success "✓ $widget_file uploaded"
        ((upload_count++))
    else
        log_error "✗ Failed to upload $widget_file"
        failed_uploads+=("$widget_file")
    fi
done

log_success "Successfully uploaded $upload_count/${#WIDGET_FILES[@]} files"

if [ ${#failed_uploads[@]} -gt 0 ]; then
    log_warning "Failed uploads: ${failed_uploads[*]}"
fi

# Step 3: Invalidate CloudFront cache
log_info "Invalidating CloudFront cache..."

# Create paths array for invalidation
invalidation_paths=()
for widget_file in "${WIDGET_FILES[@]}"; do
    invalidation_paths+=("/$widget_file")
done

# Create invalidation
invalidation_output=$(aws cloudfront create-invalidation \
    --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --paths "${invalidation_paths[@]}" \
    2>&1)

if [ $? -eq 0 ]; then
    invalidation_id=$(echo "$invalidation_output" | grep '"Id"' | cut -d'"' -f4)
    log_success "CloudFront invalidation created: $invalidation_id"
    log_info "Invalidation is in progress. It may take 1-5 minutes to complete."
    
    # Optional: Wait for invalidation to complete
    read -p "Do you want to wait for invalidation to complete? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "Waiting for invalidation to complete..."
        aws cloudfront wait invalidation-completed \
            --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
            --id "$invalidation_id"
        log_success "CloudFront invalidation completed!"
    fi
else
    log_error "Failed to create CloudFront invalidation"
    log_error "$invalidation_output"
    exit 1
fi

# Step 4: Summary
log_success "Deployment completed successfully!"
echo
echo "📊 Summary:"
echo "  - Files uploaded: $upload_count/${#WIDGET_FILES[@]}"
echo "  - CloudFront invalidation: $invalidation_id"
echo "  - S3 Bucket: $S3_BUCKET"
echo "  - Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
echo

if [ ${#failed_uploads[@]} -gt 0 ]; then
    echo "⚠️  Failed uploads:"
    for file in "${failed_uploads[@]}"; do
        echo "    - $file"
    done
    echo
fi

log_info "Your widget is now deployed and cache has been invalidated!"
log_info "Changes should be visible within 1-5 minutes globally."
