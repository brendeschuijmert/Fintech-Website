;(function(factory) {
  "use strict"
  if (typeof module === "object" && module.exports) {
    module.exports = factory
  } else {
    factory(Highcharts)
  }
})(function(H) {
  H.wrap(H.seriesTypes.bar.prototype, "translate", function(proceed) {
    const options = this.options
    const topMargin = options.topMargin || 0
    const bottomMargin = options.bottomMargin || 0
    proceed.call(this)
    H.each(this.points, function(point) {
      if (
        options.sleeveBorderRadiusTopLeft ||
        options.sleeveBorderRadiusTopRight ||
        options.sleeveBorderRadiusBottomRight ||
        options.sleeveBorderRadiusBottomLeft
      ) {
        const w = point.shapeArgs.width
        const h = point.shapeArgs.height
        const x = point.shapeArgs.x
        const y = point.shapeArgs.y
        let radiusTopLeft = H.relativeLength(
          options.sleeveBorderRadiusTopLeft || 0,
          w
        )
        let radiusTopRight = H.relativeLength(
          options.sleeveBorderRadiusTopRight || 0,
          w
        )
        let radiusBottomRight = H.relativeLength(
          options.sleeveBorderRadiusBottomRight || 0,
          w
        )
        let radiusBottomLeft = H.relativeLength(
          options.sleeveBorderRadiusBottomLeft || 0,
          w
        )
        const maxR = Math.min(w, h) / 2
        if (point.y > 0) {
          radiusTopLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft
          radiusTopRight = radiusTopRight > maxR ? maxR : radiusTopRight
          radiusBottomRight =
            radiusBottomRight > maxR ? maxR : radiusBottomRight
          radiusBottomLeft = radiusBottomLeft > maxR ? maxR : radiusBottomLeft
        } else {
          radiusBottomLeft = radiusTopLeft > maxR ? maxR : radiusTopLeft
          radiusBottomRight = radiusTopRight > maxR ? maxR : radiusTopRight
          radiusTopRight = 0
          radiusTopLeft = 0
        }
        point.dlBox = point.shapeArgs
        point.shapeType = "path"
        point.shapeArgs = {
          d: [
            "M",
            x + radiusTopLeft,
            y + topMargin,
            "L",
            x + w - radiusTopRight,
            y + topMargin,
            "C",
            x + w - radiusTopRight / 2,
            y,
            x + w,
            y + radiusTopRight / 2,
            x + w,
            y + radiusTopRight,
            "L",
            x + w,
            y + h - radiusBottomRight,
            "C",
            x + w,
            y + h - radiusBottomRight / 2,
            x + w - radiusBottomRight / 2,
            y + h,
            x + w - radiusBottomRight,
            y + h + bottomMargin,
            "L",
            x + radiusBottomLeft,
            y + h + bottomMargin,
            "C",
            x + radiusBottomLeft / 2,
            y + h,
            x,
            y + h - radiusBottomLeft / 2,
            x,
            y + h - radiusBottomLeft,
            "L",
            x,
            y + radiusTopLeft,
            "C",
            x,
            y + radiusTopLeft / 2,
            x + radiusTopLeft / 2,
            y,
            x + radiusTopLeft,
            y,
            "Z",
          ],
        }
      }
    })
  })
})
