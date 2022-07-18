<template>
<!-- Shell -->
<div class="shell">
  <!-- Header -->
  <div id="header">
    <h1 id="logo"><a href="#">shoparound</a></h1>
    <!-- Cart -->
    <div id="cart"> <a href="#" class="cart-link">Your Shopping Cart</a>
      <div class="cl">&nbsp;</div>
      <span>Articles: <strong>4</strong></span> &nbsp;&nbsp;
      <span>Cost: <strong>$250.99</strong></span>
    </div>
    <!-- End Cart -->
    <!-- Navigation -->
    <div id="navigation">
      <ul>
        <li><a href="#" class="active">Home</a></li>
        <li><a href="#">Support</a></li>
        <li><a href="#">My Account</a></li>
        <li><a href="#">The Store</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <!-- End Navigation -->
  </div>
  <!-- End Header -->
  <!-- Main -->
  <div id="main">
    <div class="cl">&nbsp;</div>
    <!-- Content -->
    <div id="content">
      <!-- Content Slider -->
      <div id="slider" class="box">
        <div id="slider-holder">
          <ul>
            <li><a href="#">
              <div class="none">!</div><img src="./assets/Images/slide1.jpg" alt="" />
            </a></li>
            <li><a href="#">
              <div class="none">!</div><img src="./assets/Images/slide1.jpg" alt="" />
            </a></li>
            <li><a href="#">
              <div class="none">!</div><img src="./assets/Images/slide1.jpg" alt="" />
            </a></li>
            <li><a href="#">
              <div class="none">!</div><img src="./assets/Images/slide1.jpg" alt="" />
            </a></li>
          </ul>
        </div>
        <div id="slider-nav">
          <a href="#" class="active"><div class="none">!</div></a>
          <a href="#"><div class="none">!</div></a>
          <a href="#"><div class="none">!</div></a>
          <a href="#"><div class="none">!</div></a>
        </div>
      </div>
      <!-- End Content Slider -->
      <!-- Products -->
      <ProductList :products="products"/>
      <BasePagination v-model:page="page" :count="countProducts" :perPages="productNumOnPage" />
      <!-- End Products -->
    </div>
    <!-- End Content -->
    <!-- Sidebar -->
    <div id="sidebar">
      <!-- Search -->
      <ProductSearch v-model:category-id="filterCategoryId" v-model:price-from="filterPriceFrom"
          v-model:price-to="filterPriceTo" v-model:key-word="filterKeyWord"
          v-model:color-id="filterColorId" />
      <!-- End Search -->
      <!-- Categories -->
      <CategoriesList v-model:categoryId="filterCategoryId"/>
      <!-- End Categories -->
    </div>
    <!-- End Sidebar -->
    <div class="cl">&nbsp;</div>
  </div>
  <!-- End Main -->
  <!-- Side Full -->
  <div class="side-full">
    <!-- More Products -->
    <div class="more-products">
      <div class="more-products-holder">
        <ul>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small1.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small2.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small3.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small4.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small5.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small6.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small7.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small1.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small2.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small3.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small4.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small5.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small6.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small7.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small1.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small2.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small3.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small4.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small5.jpg" alt="" /></a></li>
          <li><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small6.jpg" alt="" /></a></li>
          <li class="last"><a href="#">
            <div class="none">!</div>
            <img src="./assets/Images/small7.jpg" alt="" /></a></li>
        </ul>
      </div>
      <div class="more-nav">
        <a href="#" class="prev">previous</a>
        <a href="#" class="next">next</a>
      </div>
    </div>
    <!-- End More Products -->
    <!-- Text Cols -->
    <div class="cols">
      <div class="cl">&nbsp;</div>
      <div class="col">
        <h3 class="ico ico1">Donec imperdiet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
        <p class="more"><a href="#" class="bul">Lorem ipsum</a></p>
      </div>
      <div class="col">
        <h3 class="ico ico2">Donec imperdiet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
        <p class="more"><a href="#" class="bul">Lorem ipsum</a></p>
      </div>
      <div class="col">
        <h3 class="ico ico3">Donec imperdiet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
        <p class="more"><a href="#" class="bul">Lorem ipsum</a></p>
      </div>
      <div class="col col-last">
        <h3 class="ico ico4">Donec imperdiet</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec imperdiet, metus ac cursus auctor, arcu felis ornare dui.</p>
        <p class="more"><a href="#" class="bul">Lorem ipsum</a></p>
      </div>
      <div class="cl">&nbsp;</div>
    </div>
    <!-- End Text Cols -->
  </div>
  <!-- End Side Full -->
  <!-- Footer -->
  <div id="footer">
    <p class="left">
      <a href="#">Home</a> <span>|</span>
      <a href="#">Support</a> <span>|</span>
      <a href="#">My Account</a> <span>|</span>
      <a href="#">The Store</a> <span>|</span>
      <a href="#">Contact</a>
    </p>
    <p class="right"> &copy; 2010 Shop Around. Design by
      <a href="http://chocotemplates.com">Chocotemplates.com</a> </p>
  </div>
  <!-- End Footer -->
</div>
<!-- End Shell -->
</template>

<script>
import ProductList from './components/ProductList.vue';
import BasePagination from './components/BasePagination.vue';
import CategoriesList from './components/CategoriesList.vue';
import ProductSearch from './components/ProductSearch.vue';

import products from './data/Products';
import categories from './data/Categories';

export default {
  name: 'App',
  components: {
    ProductList,
    BasePagination,
    CategoriesList,
    ProductSearch,
  },
  watch: {
    filterColorId() {
      this.page = 1;
    },
    filterCategoryId() {
      this.page = 1;
    },
    filterPriceFrom() {
      this.page = 1;
    },
    filterPriceTo() {
      this.page = 1;
    },
    filterKeyWord() {
      this.page = 1;
    },
    productNumOnPage() {
      this.page = 1;
    },
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterKeyWord: '',
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productNumOnPage: 3,
    };
  },
  computed: {
    filterProducts() {
      let result = products;
      const filterKeyWord = this.filterKeyWord.toUpperCase();

      if (this.filterPriceFrom) {
        result = result.filter((p) => p.price >= this.filterPriceFrom);
      }

      if (this.filterPriceTo) {
        result = result.filter((p) => p.price <= this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        result = result.filter((p) => p.categoryId === this.filterCategoryId);
      }

      if (this.filterKeyWord.length > 0) {
        result = result.filter((p) => p.title.toUpperCase().includes(filterKeyWord));
      }

      if (this.filterColorId > 0) {
        result = result.filter((p) => p.colors.find((el) => el.id === this.filterColorId)
          !== undefined);
      }

      return result;
    },
    countProducts() {
      return this.filterProducts.length;
    },
    categories() {
      return categories;
    },
    products() {
      const end = this.productNumOnPage * this.page;
      const begin = end - this.productNumOnPage;
      return this.filterProducts.slice(begin, end);
    },
  },
};
</script>

<style lang="stylus">
* { padding:0; margin:0; outline:0; }
body {
background:#fff url(./assets/Images/body.gif) repeat-x 0 0;
font-family: "Trebuchet MS", Arial, sans-serif;
font-size:12px;
line-height:16px;
color:#636363;
}
input, textarea, select { font-family: "Trebuchet MS", Arial, sans-serif; font-size:12px; }

a img { border:0; }

a { color:#8b0000; text-decoration: underline; cursor:pointer; }
a:hover { color:#666; text-decoration: none; }

.left, .alignleft { float:left; display:inline; }
.right, .alignright { float:right; display:inline; }

.cl { font-size:0; line-height:0; clear:both; display:block; height:0; }

.al { text-align: left; }
.ar { text-align: right; }
.ac { text-align: center; }

h2 { font-size:14px; line-height:16px; }
h3 { font-size:12px; line-height:14px; text-transform: uppercase; color:#000; }
h4 { font-size:12px; line-height:14px; text-transform: uppercase; color:#000; }

h1#logo { font-size:0; line-height:0; width:156px; height:64px; float:left; }
h1#logo a{
  display:block; height:64px; text-indent: -4000px; background:url(./assets/Images/logo.gif);
}

.shell { width:960px; margin:0 auto; padding:10px; background:#fff; }

#header { height:64px; background:url(./assets/Images/header.gif); position:relative;}

#navigation { float:right; white-space:nowrap; }
#navigation ul{ list-style-type: none; height:64px; font-weight: bold; float:left;}
#navigation ul li{ float:left; display:inline; }
#navigation ul li a{
  float:left; height:64px; line-height:64px;
  text-decoration: none; color:#fff; padding:0 15px;}
#navigation ul li a.active,
#navigation ul li a:hover{ background:#fff; color:#8b0000; }

#cart {
  float:right; width:160px; top:0; right:0; height:51px; background:#8b0000;
  color:#fff; padding:13px 10px 0 10px; white-space:nowrap; line-height:20px;}
a.cart-link {
  color:#fff; background:url(./assets/Images/cart-link.gif) no-repeat 0 0; padding:0 0 0 32px;
  text-decoration: none;}
a.cart-link:hover { text-decoration: underline;}

#sidebar { float:left; width:226px;}
#content { float:right; width:724px;}

#main { padding:10px 0 0 0; }

.box { padding:1px; border:solid 1px #dedede; margin-bottom:10px;}
.box h2{
  background:#7f7f7f; color:#fff; font-weight: normal; padding:0 5px;
  position:relative; height:27px; line-height:27px; }
.box h2 span{
  position:absolute; width:10px; height:5px; background:url(./assets/Images/h2-arr.gif);
  top:27px; right:10px; font-size:0; line-height:0;}
.box-content { padding:5px;}

a.bul { background:url(./assets/Images/bul.gif) no-repeat 0 center; padding-left:10px;}

#slider { height:252px; position:relative; overflow:hidden; }
#slider-holder { width:720px; height:252px; position:relative; overflow:hidden; }
#slider-holder .jcarousel-clip{ width:720px; height:252px; position:relative; overflow:hidden; }
#slider-holder ul{
  width:720px; height:252px; position:relative;
  overflow:hidden; list-style-type: none;}
#slider-holder ul li{ width:720px; height:252px; position:relative; overflow:hidden; float:left; }

#slider-nav { position:absolute; top:231px; left:644px; z-index:2;}
#slider-nav a{
  font-size:0; line-height:0; text-indent: -4000px; width:10px;
  height:10px; border:solid 1px #8b0000; background:#8b0000; float:left; margin-right:5px; }
#slider-nav a:hover,
#slider-nav a.active { background:#fff;}

.products {}
.products ul{ list-style-type: none;}

.more-products { border:solid 1px #dedede; position:relative; height:114px; overflow:hidden; }
.more-products ul{ list-style-type: none; height:94px;
  position:relative; overflow:hidden; width:805px;}
.more-products ul li{ float:left; width:94px; height:94px;
  border-right:dashed 1px #ccc; padding:0 10px;}
.more-products ul li.last{ border-right:0; }

.more-products-holder { width:804px; height:94px; position:relative;
  overflow:hidden; top:10px; left:70px;}
.more-products-holder .jcarousel-clip{ width:804px;
  height:94px; position:relative; overflow:hidden; }

.more-nav { font-size:0; line-height:0;}
.more-nav a{ position:absolute; top:40px; left:0; width:30px;
  height:32px; text-indent: -4000px; z-index:3;}
.more-nav a.next{ background:url(./assets/Images/next.gif); left:910px;}
.more-nav a.prev{ background:url(./assets/Images/prev.gif); left:20px;}

.cols { padding:15px 0;}
.col { float:left; display:inline; width:217px; margin-right:30px;}
.col-last { margin-right:0;}

h3.ico { background-repeat:no-repeat; background-position:0 2px; padding:6px 0 8px 30px;}
h3.ico1 { background-image:url(./assets/Images/ico1.gif);}
h3.ico2 { background-image:url(./assets/Images/ico2.gif);}
h3.ico3 { background-image:url(./assets/Images/ico3.gif);}
h3.ico4 { background-image:url(./assets/Images/ico4.gif);}

#footer { height:51px; background:#ebebeb; white-space:nowrap;
  line-height:50px; padding:0 15px; color:#7b7b7b; margin-top:10px;}
#footer a{ color:#7b7b7b; text-decoration: none;}
#footer a:hover{ color:#000;}
#footer span{ padding:0 2px;}

.none {display: none;}
</style>
