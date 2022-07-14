<template>
<li :class="{'last': isLastInLine}"><a href="#"><i class="none">!</i>
  <img :src="product.image" alt="" /></a>
  <div class="product-info">
    <h3>LOREM IPSUM</h3>
    <div class="product-desc">
      <p>{{product.title}}</p>
      <strong class="price">${{product.price}}</strong>
    </div>
  </div>
</li>
</template>

<script>
export default {
  name: 'ProductItem',
  components: {

  },
  props: {
    isLastInLine: Boolean,
    product: {
      title: String,
      price: Number,
      image: String,
    },
  },
};
</script>

<style lang="stylus">
.products ul li{
  position:relative; padding:1px; border:solid 1px #dedede;
  float:left; width:231px; margin-right:9px; height:383px; overflow:hidden; }
.products ul li.last{ margin-right:0; }

.product-info{ position:absolute; width:153px; top:194px; left:0;}
.product-info h3{ background:#8b0000; color:#fff; padding:6px 10px; }
.product-info h4{ font-weight: normal;}
.product-info p{
  font-size:16px; line-height:18px; text-transform: uppercase;
  font-weight: bold; color:#000; padding:5px 0 7px 0;}
.product-info .product-desc{ padding:10px; background:url(../assets/Images/info.png); width:133px; }

.price { display:block; font-size:21px; color:#8b0000; line-height:23px; }

.none {display: none;}
</style>
