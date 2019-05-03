<template>
    <div>Hello world</div>
</template>

<script>
    export default {
        created() {
            console.log(this.$route.params.id);
        }
    }
</script>