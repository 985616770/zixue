(function() {
  const getRem = () => {
    let viewWidth =
      document.documentElement.getBoundingClientRect().width ||
      document.documentElement.clientWidth ||
      window.innerWidth;
    let ratio = 18;
    document.documentElement.style.fontSize = viewWidth / ratio + "px";
  };
  getRem();
  window.addEventListener("resize", getRem);
})();
