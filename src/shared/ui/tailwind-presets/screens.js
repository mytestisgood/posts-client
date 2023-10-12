/**
 * lg - large
 * sm - small
 * gt - greater than
 * lt - lower than
 */
module.exports = {
    'mobile': {'raw': '(max-width: 767.98px)'}, // 360 - 768
    'tablet': {'raw': '(max-width: 1023.98px) and (min-width: 768px)'}, // 768 - 1024
    'lg-tablet': {'raw': '(max-width: 1279.98px) and (min-width: 1024px)'}, // 1024 - 1280
    'bg-tablet': {'raw': '(max-width: 1279.98px) and (min-width: 768px)'}, // 768- 1280
    'sm-desktop': {'raw': '(max-width: 1439.98px) and (min-width: 1280px)'}, // 1280 - 1440
    'desktop': {'raw': '(min-width: 1440px)'}, // 1440+
    'lg-desktop': {'raw': '(min-width: 1980px)'}, // 1980+
    'bg-desktop': {'raw': '(min-width: 2288px)'}, // 2288+

    'lt-lg-tablet': {'raw': '(max-width: 1023.98px)'}, // 360 - 1024
    'lt-sm-desktop': {'raw': '(max-width: 1279.98px)'}, // 360 - 1280
    'lt-desktop': {'raw': '(max-width: 1439.98px)'}, // 360 - 1440
    'lt-lg-desktop': {'raw': '(max-width: 1979.98px)'}, // 360 - 1980

    'gt-mobile': {'raw': '(min-width: 768px)'}, // 768+
    'gt-tablet': {'raw': '(min-width: 1024px)'}, // 1024+
    'gt-lg-tablet': {'raw': '(min-width: 1280px)'}, // 1280+
    'gt-sm-desktop': {'raw': '(min-width: 1440px)'}, // 1440+
    'gt-desktop': {'raw': '(min-width: 1980px)'}, // 1980+
}
