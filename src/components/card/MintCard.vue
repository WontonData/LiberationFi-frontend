<template>
  <el-card shadow="hover">
    <div class="bp3-card bp3-elevation-0 flex flex-1 flex-col space-y-4 border border-gray-600">
      <div class="flex flex-col w-full space-y-4">
        <div class="flex flex-col space-y-2 mb-4"><span class="text-center mb-4 font-semibold">Mint Principal and Yield tokens with your USDC</span>
          <div class="bp3-form-group w-full mb-0 col-span-2">
            <div class="bp3-form-content">
              <div class="bp3-input-group w-full TokenAmountInput_investmentAmount__1D1V5"><span
                  class="bp3-input-left-container"><img alt="usdc" class="ml-2" src="/static/media/USDC.f08e02b1.svg"
                                                        height="20" width="20"></span><input type="text" placeholder="0"
                                                                                             class="bp3-input" value=""
                                                                                             style="padding-left: 28px; padding-right: 61px;"><span
                  class="bp3-input-action"><div class="pl-1 mr-1"><button type="button"
                                                                          class="bp3-button bp3-outlined bp3-intent-primary"><span
                  class="bp3-button-text">MAX</span></button></div></span></div>
            </div>
          </div>
          <span class="text-right">Available balance: 0.0000 USDC</span></div>
        <div class="flex flex-col space-y-6">
          <div class="flex items-center w-full justify-center text-center">
            <div class="flex flex-col"><span class="font-semibold"><span>Principal Tokens you receive</span></span><span
                class="text-sm"><span class="text-base">0.0000 ePyvUSDC</span></span></div>
          </div>
          <div class="flex items-center w-full justify-center text-center">
            <div class="flex flex-col"><span class="font-semibold"><span>Yield Tokens you receive</span></span><span
                class="text-sm"><span class="text-base">0.0000 eYyvUSDC</span></span></div>
          </div>
          <button type="button" class="bp3-button bp3-large bp3-outlined bp3-intent-primary flex"><span
              class="bp3-button-text">Connect wallet</span></button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "MintCard"
}
</script>

<style scoped>

</style>