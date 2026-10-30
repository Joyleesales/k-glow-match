# Judge walkthrough

1. Start with **Just exploring? Try the demo**. No key or personal selfie is required.
2. Review the five sample skin metrics. Choose **Find my K-beauty matches**.
3. Skip age for the default matches, or select 20s / 30s / 40s / 50s+ to see the order change. Skin concerns remain the primary match criteria.
4. Browse the eight real products under **All essentials**. Open the source links to see reference details. Add a curated ritual or individual items.
5. Choose **Next: find your color**, adjust lip/blush and intensity, and compare the mock preview with the original illustration.
6. Open the bag, change quantities, check the USD total, and choose **Finish demo**. No order or payment occurs.

## Live YouCam path

Use a clear, front-facing photo of yourself with permission to process it. Upload it, enable the YouCam processing checkbox, and choose **Analyze with YouCam**. The server API key must be configured. Live processing consumes account units.

The live report shows actual returned Skin AI scores. Continue to matches, then color. Choose colors and click **Render with YouCam** to create a real Makeup VTO result. Compare it with the original. Changing colors requires another render; it does not spend units automatically.

The 2-stage API integration was verified with the vendor’s public sample photo. Live app: https://k-glow-match.vercel.app/ . Public source: https://github.com/Joyleesales/k-glow-match . The hosted skin-age parser was verified with the vendor sample after the October 29 fix.
