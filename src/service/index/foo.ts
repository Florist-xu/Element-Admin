import { http } from '@/utils/http'
export interface IFooItem {
  id: string
  name: string
}

/** GET 请求 */
export const getFooAPI = (name: string) => {
  return http.get<IFooItem>('/foo', { name })
}
export const getSongs = (data) => {
  return http.get('/api/get_diss_by_tag', data)
}
export const getPlaylist = (data) => {
  return http.get('/api/get_play_list', data)
}

/** POST 请求 */
export const postFooAPI = (name: string) => {
  return http.post<IFooItem>('/foo', { name }, { name })
}
