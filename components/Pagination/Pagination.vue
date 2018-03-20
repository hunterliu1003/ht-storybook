<template>
  <div v-show="!(total === 0)" class="rt-pagination">
    <ul class="page-link-list" :class="{ 'page-lock': isLock }">
      <li class="prev" :class="{ current: !isPrev }">
        <a href="#" @click.prevent="prev">上一頁</a>
      </li>
      <li class="prev-10" :class="{ disable: !isPrev10 }">
        <a href="#" @click.prevent="prev10">上10頁</a>
      </li>

      <li
        v-for="pageNum in pageList"
        :key="pageNum"
        class="page-to"
        :class="{ active: isCurrentPage(pageNum) }"
      >
        <a href="#" @click.prevent="setPage(pageNum)">{{ pageNum }}</a>
      </li>

      <li class="next-10" :class="{ disable: !isNext10 }">
        <a href="#" @click.prevent="next10">下10頁</a>
      </li>
      <li class="next" :class="{ current: !isNext }">
        <a href="#" @click.prevent="next">下一頁</a>
      </li>
    </ul>

    <div class="page-info">
      <span class="page-info-num">每頁 {{ perPage }} 項，</span>
      <span class="page-info-pagenum">第 {{ page }} / {{ pages }} 頁</span>
      <span class="page-info-total"> ( 共 {{ total }} 項商品 )</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    isLock: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    pages () {
      return (this.total > 0) ? Math.ceil(this.total / this.perPage) : 1
    },
    isPrev () {
      return this.page !== 1
    },
    isNext () {
      return this.page !== this.pages
    },
    isPrev10 () {
      return this.page >= 11
    },
    isNext10 () {
      return this.page <= Math.floor(this.pages / 10) * 10
    },
    isRestPages () {
      return this.page > Math.floor(this.pages / 10) * 10
    },
    pageList () {
      let indexNum
      if (this.isRestPages) {
        indexNum = this.pages - Math.floor(this.pages / 10) * 10
      } else {
        indexNum = 10
      }
      return Array.apply(null, new Array(indexNum))
        .map((_, i) => this.startPage + i + 1)
    },
    startPage () {
      return Math.floor(this.page / 10) * 10
    }
  },
  methods: {
    isCurrentPage (pageNum) {
      return this.page === pageNum
    },
    setPage (thePage) {
      if (!this.isLock) {
        if (thePage < 1) { thePage = 1 }
        if (thePage > this.pages) { thePage = this.pages }
        this.$emit('set-page', thePage)
      }
    },
    prev () {
      if (this.isPrev) { this.setPage(this.page - 1) }
    },
    next () {
      if (this.isNext) { this.setPage(this.page + 1) }
    },
    prev10 () {
      if (this.isPrev10) { this.setPage(this.page - 10) }
    },
    next10 () {
      if (this.isNext10) { this.setPage(this.page + 10) }
    }
  }
}
</script>

<style lang="stylus" scoped>
@lock-color: #929292
@default-icon-color: #202020
@active-color: #3f3f3f

// replaceing pagination arrows with fontawesome

.rt-pagination
  margin: 20px auto
  text-align: center
  -webkit-user-select: none

  .page-link-list
    margin-bottom: 15px
    white-space: nowrap

    &.is-locked,
    &.page-lock
      a
        color: @lock-color

        &:hover
          cursor: progress
        
      
      .active a
        background-color: transparent
        color: transparent
      
      .active a:before
        position: absolute
        margin: -3px 0 0 -2px
        animation: spin 1s infinite steps(8)

        @keyframes spin
          0%
            transform: rotate(0deg)
          
          100%
            transform: rotate(359deg)
          
  
  li
    display: inline-block

    a
      display: inline-block
      padding: 6px 8px
      border-radius: 2px
      font-size: @font_size
      line-height: 1
      color: #4d4d4d
      &:hover
        text-decoration: underline
      
    
  

  .page-to
    margin: 0 1px
  
  .prev, .prev-10
    margin-right: 10px
  
  .next, .next-10
    margin-left: 10px
  
  .prev a:before
  
  .next a:after
  
  .prev-10 a:before
  
  .next-10 a:after
  

  .active, .current
    a
      text-decoration: none
      cursor: default
    
  
  .active a
    font-weight: bold
    color: #fff
    background-color: @active-color
  

  .current a
    color: @lock-color
    &:hover
      text-decoration: none
    

  .disable
    position: relative
    left: -50000px
  

  .page-info
    font-size: @font_size
    color: #767676
  

  .page-info-total
    margin-left: 2px
  


.rt-pagination-lite
  display: inline-block
  margin: 0
  vertical-align: middle

  .prev, .prev-10
    margin-right: 0px
  
  .next, .next-10
    margin-left: 0px
  
  .page-link-list
    margin-bottom: 0
    .page-to, .prev-10, .next-10
      display: none
    
  
  li
    margin: 0 0 0 10px
    a
      padding-left: 5px
      padding-right: 5px
    
  
  .page-info
    display: none
  


</style>