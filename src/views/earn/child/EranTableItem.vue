<template>
  <tr>
    <td>
      <div class="left" >
        <img alt="美元" height="38" width="38">
<!--        <img alt="美元" src="@/assets/token/USDC.svg" height="38"-->
<!--             width="38">-->
      </div>
      <item-text class="left" data="USDC v2" title="向往金库"/>
    </td>
    <td>
      <item-text data="5,759,150 美元" />
    </td>
    <td>
      <item-text data="6.41%"/>
    </td>
    <td>
      <item-text data="0.81%" title="主要的"/>
      <item-text data="0.24%" title="屈服"/>
    </td>
    <td>
      <item-text data="5,378,950 美元" title="本金池"/>
      <item-text data="17,028 美元" title="收益池"/>
    </td>
    <td>
      <item-text data="0.9851" title="主体代币"/>
      <item-text data="0.0151" title="收益代币"/>
    </td>
    <td>
      <item-text data="6.64%"/>
    </td>
    <td>
      <item-time time="2021 年 10 月 30 日" day="88天" rest="2 个月，还有 20 天" />

    </td>
    <td>
      <button type="button" class="bp3-button bp3-fill bp3-large bp3-minimal bp3-intent-primary"><span
          class="bp3-button-text"><font style="vertical-align: inherit;"><font
          style="vertical-align: inherit;">显示</font></font></span></button>
    </td>

  </tr>
</template>

<script>
import ItemText from "./ItemText";
import ItemTime from "./ItemTime";

export default {
  name: "EranTableItem",
  components: {ItemTime, ItemText}
}
</script>

<style scoped>
tr {
  background-color: #374e63;
  border: none;
  border-radius: 10px;
}
td {
  /*border: #42b983 2px solid;*/
  padding: 5px;
}
img {
  margin-left: 10px;
  margin-right: 15px;
}
</style>