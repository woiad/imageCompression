const MAX_WIDTH = 800; //图片最大宽度

function compress(base64, quality, mineType) {
  let canvas = document.createElement('canvas')
  let img = document.createElement('img')
  img.crossOrigin = 'anonymous'
  return new Promise((resolve, reject) => {
    img.src = base64
    img.onload = () => {
      let targeWidth, targeHeight;
      if (img.width > MAX_WIDTH) {
        targeWidth = MAX_WIDTH
        targeHeight = (img.height * MAX_WIDTH) / img.width
      } else {
        targeWidth = img.width
        targeHeight = img.height
      }
      canvas.width = targeWidth
      canvas.height = targeHeight
      let ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, targeWidth, targeHeight)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      document.body.appendChild(canvas)
      let imageData = canvas.toDataURL(mineType, quality / 100)
      resolve(imageData)
    }
  })
}

function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1])
  let ab = new ArrayBuffer(bytes.length)
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], { type: mimeType })
}

function uploadFile(url, blob) {
  let formData = new FormData()
  let request = new XMLHttpRequest()
  formData.append("image", blob)
  console.log(blob)
  request.open("POST", url, true)
  request.send(formData)
}
