export default function Line (ctx, from, posTo, style) {
  this.posFrom = from
  this.posTo = posTo
  this.style = style
  this.updated = false

  this.update = () => {
    this.draw()
  }

  this.draw = () => {
    ctx.beginPath()
    ctx.moveTo(this.posFrom.x, this.posFrom.y)
    ctx.lineTo(this.posTo.x, this.posTo.y)
    ctx.strokeStyle = this.style.color
    ctx.lineWidth = this.style.width
    ctx.stroke()
    ctx.closePath()
  }
}