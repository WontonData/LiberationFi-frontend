
// 以wei为单位 -> eth
export let nBig2Small = function(big){
  let head = "000000000000000000"
  let out = head + big
  let l = out.length
  out = out.substring(0,l-18)+"."+out.substring(l-18)
  while(out.substring(0,1)=="0" && out.substring(1,2)!="."){
    out = out.substring(1)
  }
  while(out.substring(out.length-1)=="0"){
    out = out.substring(0,out.length-1)
  }
  if(out.substring(out.length-1)=="."){
    out = out.substring(0,out.length-1)
  }
  return out
}

// 以eth为单位 -> wei
export let nSmall2Big = function(smallStr){
  let tail = "000000000000000000"
  let sp = smallStr.split(".")
  let out = ""
  if(sp.length==1){
    out = smallStr+tail
    while(out.substring(0,1)=="0"){
      out = out.substring(1)
    }
    return out
  }else {
    out = sp[0]+(sp[1]+tail).substring(0,18)
    while(out.substring(0,1)=="0"){
      out = out.substring(1)
    }
    return out
  }
}

export default {
  nBig2Small,
  nSmall2Big
}