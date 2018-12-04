<template>
    <div class="tips">
        <transition 
            name="fade"
            enter-active-class="active"
            leave-active-class="leave"
        >
            <div class="alert" v-if="getTipsIsShow.isShow" :class="getTipsIsShow.className">{{getTipsIsShow.txt}}</div>
        </transition>
       
    </div>
</template>

<script>
export default {
    name: 'tips',
    computed: {
        getTipsIsShow() {
            return this.$store.getters.getTipsIsShow
        }
    }
}
</script>

<style scoped>
@keyframes enter {
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0.5;
    }
    100%{
        opacity: 1;
    }
}
.active{
    animation: enter 1s;
}
.leave{
    animation: enter 1s reverse;
}
.tips{
    
}
</style>