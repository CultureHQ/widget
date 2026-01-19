# Widget Deployment Guide

## Quick Deployment

To deploy the widget with a single command:

```bash
./deploy-widget.sh
```

## What the script does

1. **Builds the widget** - Cleans the `dist` folder and runs `npm run build`
2. **Uploads to S3** - Deploys the built widget to all 8 widget files in S3 with cache-busting headers
3. **Invalidates CloudFront** - Forces CloudFront to fetch fresh copies from S3
4. **Provides feedback** - Shows progress and summary of the deployment

## Widget Files Updated

The script automatically updates these widget files:
- `widget_trends_1657874665.js`

## Prerequisites

- Node.js and npm installed
- AWS CLI installed and configured
- Proper AWS permissions for:
  - S3 bucket `culturehq-assets`
  - CloudFront distribution `E189Z1LC7CKQNR`

## Manual Deployment (if needed)

If you need to deploy manually or to specific files:

### 1. Build
```bash
npm run build
```

### 2. Upload specific file
```bash
aws s3 cp dist/main.js s3://culturehq-assets/widget_trends_TIMESTAMP.js \
  --cache-control "no-cache, must-revalidate" \
  --content-type "application/javascript" \
  --metadata-directive REPLACE
```

### 3. Invalidate CloudFront
```bash
aws cloudfront create-invalidation \
  --distribution-id E189Z1LC7CKQNR \
  --paths "/widget_trends_TIMESTAMP.js"
```

## Troubleshooting

### Script fails with permission errors
- Check AWS credentials: `aws sts get-caller-identity`
- Verify S3 access: `aws s3 ls s3://culturehq-assets/`

### Build fails
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript/ESLint errors
- Verify `babel-plugin-styled-components` is in devDependencies

### CloudFront invalidation takes time
- Invalidations typically take 1-5 minutes to propagate globally
- You can check status: `aws cloudfront get-invalidation --distribution-id E189Z1LC7CKQNR --id INVALIDATION_ID`

### Cache still showing old version
- Try hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check browser dev tools → Network tab for cache headers
- Test in incognito/private mode

## Configuration

Edit the script variables if needed:
- `S3_BUCKET`: S3 bucket name (default: `culturehq-assets`)
- `CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID (default: `E189Z1LC7CKQNR`)
- `WIDGET_FILES`: Array of widget filenames to update
