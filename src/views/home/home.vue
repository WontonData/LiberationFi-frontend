<template>
  <div>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24" class="main-title">
              <span class="title">DeFi's fixed rate protocol</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="main-word">
              LiberationFi is an open source protocol for fixed and variable yield markets
          </el-col>
        </el-row>
        <el-row :gutter="20" class="main-button">
          <el-col :span="3" :offset="9">
            <el-button type="primary" plain @click="toEarn()">START SAVING</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" plain @click="toEarn()">START EARNING</el-button>
          </el-col>
        </el-row>
      </el-main>

      <el-footer>
        <el-row :gutter="20">
          <el-col :span="4" class="grid-content">
            <el-row>
              <el-col :span="24"><div class="footer1-1"></div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer1-2">DEFI PULSE</div></el-col>
            </el-row>
          </el-col>

          <el-col :span="4" class="grid-content">
            <el-row>
              <el-col :span="24"><div class="footer2">Save</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Earn</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Trade</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Build</div></el-col>
            </el-row>
          </el-col>

          <el-col :span="4" class="grid-content">
            <el-row>
              <el-col :span="24"><div class="footer2">Documentation</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Paper</div></el-col>
            </el-row>
          </el-col>

          <el-col :span="4" class="grid-content">
            <el-row>
              <el-col :span="24"><div class="footer2">Discord</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Twitter</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Medium</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Github</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer2">Youtube</div></el-col>
            </el-row>
          </el-col>

          <el-col :span="8" class="grid-content">
            <el-row>
              <el-col :span="24"><div class="footer3-1">Sign up for our newsletter</div></el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="14"><div class="footer3-2">
                <el-input placeholder="Email address"></el-input>
              </div></el-col>
              <el-col :span="7"><div class="footer3-2">
                <el-button type="primary" plain>SUBSCRIBE</el-button>
              </div></el-col>
            </el-row>
            <el-row>
              <el-col :span="24"><div class="footer3-3">Term of Service&nbsp&nbsp&nbsp&nbspPrivacy Policy</div></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
  import Earn from "../earn/Earn";

  export default {
    name: "home",
    methods: {
      toEarn() {
        this.$router.push({
          path: "Earn",
        });
      }
    }
  }
</script>

<style>
  .el-footer {
    background-color: var(--purple-footer);
    /*color: #333;*/
    text-align: center;
    line-height: 60px;
    height: 250px!important;
  }
  .el-main {
    /*background-color: var(--purple-light);*/
    /*color: #ffffff;*/
    text-align: center;
    line-height: 70px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }

  .main-title{
    height: 290px;
    /*background-color: rgba(66, 185, 131, 0.43);*/
    /*color: white;*/
    padding-top: 220px;
  }
  .main-word{
    height: 80px;
    /*background-color: rgba(88, 139, 198, 0.15);*/
    /*color: #a4a4a4;*/
    font-size: 18px;
    position: relative;
    text-indent:30px;
    font-weight: bolder;
    line-height: 50px;
    background-image: -webkit-linear-gradient(100deg, #6de9ba, #6ad4ef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .main-button{
    height: 240px;
    /*background-color: rgba(167, 182, 194, 0.3);*/
    color: var(--purple-dark-shade);
  }

  .el-button--primary.is-plain {
    color:  var(--purple-dark-shade)!important;
    background: #6fedcf!important;
    border-color: #6fedcf!important;
    border-radius: 20px;
    font-weight: 700;
  }

  .el-button--primary.is-plain:hover {
    color: #6fedcf!important;
    background-color: rgba(134, 175, 209, 0.09) !important;
    border-color: #6fedcf!important;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    height: 200px;
    margin-top: 25px;
    margin-bottom: 15px;
  }

  .footer1-1 {
    /*background: var(--pink);*/
    height: 160px;
  }
  .footer1-2 {
    /*background: #86afd1;*/
    height: 50px;
    font-size: 20px;
    font-weight: bold;
    /*color: #42b983;*/
    background-image: -webkit-linear-gradient(30deg, #58e998, #53bcef);
    position: relative;
    text-indent:30px;
    line-height: 50px;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .footer2{
    padding-top: 4px;
    height: 30px;
    color: #ffffff;
    font-size: 14px;
  }
  .footer3-1{
    float: left;
    color: #ffffff;
    font-size: 14px;
    padding-top: 4px;
    height: 55px;
  }
  .footer3-3{
    float: right;
    color: #ffffff;
    font-size: 16px;
    padding-top: 45px;
  }
  .title {
    position: relative;
    text-align: left;
    text-indent:30px;
    font-size: 65px;
    font-weight: bolder;
    line-height: 50px;
    background-image: -webkit-linear-gradient(180deg, #58e998, #53bcef);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
</style>
