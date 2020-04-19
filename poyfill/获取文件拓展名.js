function getFileExtension1(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}

function getFileExtension2(filename) {
  return filename.split('.').pop()
}

function getFileExtension3(filename) {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2)
}
