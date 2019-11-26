<template>
  <div>
    <div class="formBox">
      <Form :model="formData" label-position="right" :label-width="80">
        <FormItem label="产品类型" class="leftBoxItem">
        <!--  <Select v-model="product_type" placeholder="请选择产品类型">
            <Option v-for="item in productList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
          <RadioGroup v-model="product_type" on-change="changeType">
                <Radio v-for="item in productList" :label="item.value" :key="item.value" border>{{item.label}}</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="姓名">
          <Input type="text" placeholder="请输入姓名" v-model="formData.username"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input type="tel" placeholder="请输入手机号" v-model="formData.mobile"></Input>
        </FormItem>
        <FormItem label="微信Id" prop="wechat_id">
          <Input type="text" placeholder="请输入微信ID" v-model="formData.wechat_id"></Input>
        </FormItem>
        <FormItem label="产品名称">
          <Input type="text" placeholder="请输入产品名称" v-model="formData.product_name"></Input>
        </FormItem>
        <div v-if="product_type != 'wx'">
          <FormItem label="累计用户数量" class="leftBoxItem">
            <RadioGroup v-model="formData.allCount">
              <Radio border :label="item.value" v-for="item in allCountType" :key="item.value">{{item.label}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="日活用户" class="leftBoxItem">
            <RadioGroup v-model="formData.dayActiveCount">
              <Radio border :label="item.value" v-for="item in dayActiveCountType" :key="item.value">{{item.label}}</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <!-- 公众号 -->
        <div v-if="product_type == 'wx'" class="leftBoxItem">
          <FormItem label="粉丝数量">
            <RadioGroup v-model="formData.subCountForwx">
              <Radio border :label="item.value" v-for="item in subCountForwxType" :key="item.value">{{item.label}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="更新频率">
            <RadioGroup v-model="formData.upadateRate">
              <Radio border :label="item.value" v-for="item in upadateRateType" :key="item.value">{{item.label}}</Radio>
            </RadioGroup>
          </FormItem>
        </div>
        <div>
            <div class="nextBox">
              <Button type="success" @click="subInfo">提交信息</Button>
            </div>
        </div>
        <!-- 公众号 -->
      </Form>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Collect',
    data() {
      const validateWechat = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else {
          if (this.formData.wechat_id !== '') {
            // 对第二个密码框单独验证
            callback(new Error('是微信id 不是微信昵称'));
          }
        }
      };
      return {
        formData: {
          username: '', //用户名称
          mobile: '', //手机号
          wechat_id: '', //微信id
          subCountForwx: 0, //粉丝数量
          product_name: '', //产品名称
          dayActiveCount: 0, //日活用户
          allCount: 0, //累计用户数
          upadateRate: 0 //更新评率
        },
        ruleCustom: {
          "wechat_id": [{
            validator: validateWechat,
            trigger: 'focus'
          }]
        },
        upadateRateType: [{
            value: 'month',
            label: '月更'
          },
          {
            value: 'week',
            label: '周更'
          },
          {
            value: 'day',
            label: '日更'
          }
        ],
        subCountForwxType: [{
            value: '10000',
            label: '10000以下'
          },
          {
            value: '50000',
            label: '10000-50000'
          },
          {
            value: '100000',
            label: '50000-100000'
          },
          {
            value: '150000',
            label: '100000+'
          }
        ],
        dayActiveCountType: [{
            value: '100',
            label: '100以下'
          },
          {
            value: '500',
            label: '100-500'
          },
          {
            value: '1000',
            label: '500-1000'
          },
          {
            value: '1500',
            label: '1000+'
          }
        ],
        allCountType: [{
            value: '5000',
            label: '5000以下'
          },
          {
            value: '10000',
            label: '5000-10000'
          },
          {
            value: '15000',
            label: '10000-15000'
          },
          {
            value: '20000',
            label: '15000+'
          },
        ],
        productList: [{
            value: 'wxapp',
            label: '小程序'
          },
          {
            value: 'wx',
            label: '公众号'
          },
          {
            value: 'wxgame',
            label: '小游戏'
          },
          {
            value: 'faceimg',
            label: '表情包'
          }
        ],
        product_type: ''
      }
    },
    mounted: function() {
      var that = this
    },
    methods: {
        subInfo(){
          console.log(this.formData)
        }
    }
  }
</script>
<style scoped>
  @import '../assets/collect.css'
</style>
