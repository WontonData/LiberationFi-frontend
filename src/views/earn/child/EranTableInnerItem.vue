<template>
  <el-row>
    <el-col :span="22" :offset="1">
      <div style="width: 12%">
        <el-timeline >
          <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              size="large"
              :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div style="width: 40%">
        <mint-card :token="token" @mint="mint"/>
      </div>
      <div style="width: 2%">
      </div>
      <div style="width: 40%">
        <div v-if="isConfirm" class="skeleton">
          <el-skeleton :rows="5" />
          <el-skeleton-item variant="button" style="width: 100%; margin-top: 25px" />
        </div>
        <div v-else>
          <confirm-card class="confirm" :number="number" :token="token" @confirm="confirm"/>
        </div>

      </div>
    </el-col>
  </el-row>
</template>

<script>
import MintCard from "../../../components/card/MintCard";
import ConfirmCard from "../../../components/card/ConfirmCard";
import store from "../../../store";
export default {
  name: "EranTableInnerItem",
  components: {ConfirmCard, MintCard},
  data() {
    return {
      activities: [{
        content: '输入铸币金额',
        type: '',
        icon: ''
      }, {
        content: '确认信息',
        type: '',
        icon: ''
      }, {
        content: '交易成功',
        type: '',
        icon: ''
      }],
      isConfirm: true,
      number: 0
    };
  },
  props: {
    token: {
      type: Object
    }
  },
  methods: {
    mint(number) {
      this.number = number *1
      this.$emit("mint", number)
      this.activities[0].type = 'success';
      this.activities[0].icon = 'el-icon-check';
      this.isConfirm = false
    },
    confirm() {
      this.$emit("confirm", this.number)
      this.activities[1].type = 'success';
      this.activities[1].icon = 'el-icon-check';
      store.dispatch("mint", {number: 123, type: 'mint'}).then(res => {
        console.log(res)
        this.activities[2].type = 'success';
        this.activities[2].icon = 'el-icon-check';
      });

    }
  }
}
</script>

<style scoped>
.el-row {
  width: 100%;
  border-top: 2px var(--purple-background) solid;
  /*background-color: ;*/
}
.el-col {
  display: flex;
  width: 100%;
}
.el-timeline {
  text-align: left;
  margin-top: 10px;
}
.skeleton {
  /*color: var(--color-text);*/
  padding: 10px;
  margin: 10px;
}
/*.confirm {*/
/*  margin-left: 20px;*/
/*}*/
</style>

<style>
.el-timeline-item__node--warning {
  background-color: var(--purple);
}
.el-skeleton__item {
  background: var(--purple-background)!important;
}
</style>