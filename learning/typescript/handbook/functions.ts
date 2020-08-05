class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) {
      // oops, used this here. using this callback would crash at runtime
      this.info = e.message;
  }
}
let h = new Handler();
