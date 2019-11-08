function A() {
    if (!new.target) throw Error('must be new');
    this.name = '';
}

console.log(A());
 