<template>
  <div>
    <Card />
    <Sale />
  </div>
</template>

<script>
import Card from './Card'
import Sale from './Sale'

export default {
  name: 'Dashboard',
  components: { Card, Sale }
}
</script>
