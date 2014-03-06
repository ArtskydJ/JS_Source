function range(n) {
  var result = [0];
  for (var i=0; i<=n; i++) {
    result[i]=i;
  }
  return result;
}

show(range(13));