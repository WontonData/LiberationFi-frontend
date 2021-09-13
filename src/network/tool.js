/*
 * @Author: OOO--li--OOO
 * @Date: 2021-09-12 21:37:22
 * @LastEditTime: 2021-09-13 20:51:57
 */
import * as ethers from "ethers";

export const changeStr = function(str,index,changeStr){
  return str.substring(0, index) + changeStr+ str.substring(index + changeStr.length);
}
// 以wei为单位 -> eth
export let nBig2Small = function(big,fixed=18,cut=true,suffix=false){
  let ten = 10 
  let five = 10 
  if(cut) five=ten++
  let head = "000000000000000000"
  let out = head + big + "0"
  let l = out.length
  out = out.substring(0,l-19)+"."+out.substring(l-19,l-19+fixed+1)
  while(out.substring(0,1)=="0" && out.substring(1,2)!="."){
    out = out.substring(1)
  }
  let j = out.substring(out.length-1)>five.toString? 1:0
  out = out.substring(0,out.length-1)
  if(suffix) out = out + "..."
  let position = out.length-1
  while(j!=0 && position>=0){
    let g = out.substring(position,position+1)
    if(g=="."){
      position--
      continue
    }
    let num = parseInt(g) + j
    out = changeStr(out,position,num.toString().substring(num.toString().length-1))
    j = num >= ten ? 1:0
    position--
  }
  // while(out.substring(out.length-1)=="0"){
  //   out = out.substring(0,out.length-1)
  // }
  // if(out.substring(out.length-1)=="."){
  //   out = out.substring(0,out.length-1)
  // }

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
export let nBiggerThen = function(a,b) {
  if(a.indexOf(".")>=0 || b.indexOf(".")>=0){
    a = nSmall2Big(a)
    b = nSmall2Big(b)
  }
  let A = ethers.BigNumber.from(a)
  let B = ethers.BigNumber.from(b)

  return A.gt(B)
}

export default {
  nBig2Small,
  nSmall2Big,
  nBiggerThen
}
