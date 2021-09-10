<template>
  <div class="box-card">
    <el-card shadow="hover">
      <el-row>
        <el-col :span="24" class="from">From</el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="from-coin">
          <el-input v-model="input" placeholder="0.00" class="input"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" class="to">To</el-col>
        <el-col :span="14" class="to">

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="to-coin">
          <el-input :rows="10" v-model="input" placeholder="0.00" class="input"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" class="more">
          <el-tag type="info" class="more-tag">
            Earned at Maturity<br/>
            <span style="font-weight: bolder">0 LUSD3CRV-f</span>
          </el-tag>
        </el-col>
        <el-col :span="12" class="more">
          <el-button type="primary" plain disabled class="more-button">Connect Wallet</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "SaveCard",
    data() {
      return {
        input: ''
      }
    }
  }
</script>

<style scoped>
  .box-card {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .el-card {
    height: 480px;
    /*margin: 0 35px 600px 390px;*/
    width: 700px;
    background-color: var(--purple-card-save);
    border-color: rgba(255, 255, 255, 0);
    padding: 10px;
    border-radius: 12px;
  }

  .from{
    height: 30px;
    /*background-color: white;*/
    display: flex;
    float: left;
    color: var(--color-text);
    font-size: 16px;
    align-items: center;
  }

  .from-coin {
    height: 120px;
    /*background-color: #42b983;*/
  }

  .to {
    height: 30px;
    /*background-color: white;*/
    display: flex;
    float: left;
    color: var(--color-text);
    font-size: 16px;
    align-items: center;
  }

  .to-coin {
    height: 120px;
    /*background-color: #42b983;*/
  }

  .more {
    height: 140px;
    padding-top: 20px;
    /*background-color: #8fb8d1;*/
  }

  .more-tag {
    height: 100px;
    width: 310px;
    /*margin: 10px;*/
    padding: 20px;
    background-color: rgb(81, 50, 142) !important;
    border-color: rgba(167, 182, 194, 0) !important;
    color: var(--color-text) !important;
    font-size: 16px;
    border-radius: 20px;
  }

  .more-button {
    height: 100px;
    width: 310px;
    font-size: 20px;
    border-radius: 8px;
  }

  .input {
    width: 660px;
    font-size: 30px;
  }

  >>> .el-input__inner{
    margin-top: 8px;
    width: 660px;
    height: 90px;
    /*background-color: rgba(11, 11, 11, 0.3);*/
    border-color: #7f8d9b;
    border-radius: 10px!important;
  }
</style>
