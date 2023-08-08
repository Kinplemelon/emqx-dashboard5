import { computed, ComputedRef, WritableComputedRef } from 'vue'
import { REDIS_TYPE } from '@/common/constants'

type RedisType = typeof REDIS_TYPE[number]

export const useRedisSecondTypeControl = (
  formData: WritableComputedRef<Record<string, any>>,
): {
  keyField: string
  currentType: ComputedRef<string>
} => {
  const keyField: RedisType = 'redis_type'
  const fieldTypeMap: Record<RedisType, string> = {
    sentinel: 'bridge_redis.post_sentinel',
    cluster: 'bridge_redis.post_cluster',
    single: 'bridge_redis.post_single',
  }
  const keyFieldValue = computed(() => formData.value?.[keyField])
  const currentType = computed(() => {
    if (keyFieldValue.value === undefined) {
      return fieldTypeMap[REDIS_TYPE[0]]
    }
    return fieldTypeMap[keyFieldValue.value]
  })

  return { keyField, currentType }
}

export const useMongoSecondTypeControl = (
  formData: WritableComputedRef<Record<string, any>>,
): {
  currentType: ComputedRef<string>
  keyField: string
} => {
  const keyField: RedisType = 'mongo_type'
  const fieldTypeMap: Record<RedisType, string> = {
    rs: 'bridge_mongodb.post_rs',
    sharded: 'bridge_mongodb.post_sharded',
    single: 'bridge_mongodb.post_single',
  }
  const keyFieldValue = computed(() => formData.value?.[keyField])
  const currentType = computed(() => {
    if (keyFieldValue.value === undefined) {
      return fieldTypeMap[REDIS_TYPE[0]]
    }
    return fieldTypeMap[keyFieldValue.value]
  })

  return { currentType, keyField }
}

export const useGCPSecondTypeControl = (
  formData: WritableComputedRef<Record<string, any>>,
): {
  currentType: ComputedRef<string>
  keyField: string
} => {
  const keyField: RedisType = 'role'
  const fieldTypeMap: Record<RedisType, string> = {
    producer: 'bridge_gcp_pubsub.post_producer',
    consumer: 'bridge_gcp_pubsub.post_consumer',
  }
  const keyFieldValue = computed(() => formData.value?.[keyField])
  const currentType = computed(() => {
    if (keyFieldValue.value === undefined) {
      return Object.entries(fieldTypeMap)[0][1]
    }
    return fieldTypeMap[keyFieldValue.value]
  })

  return { currentType, keyField }
}
