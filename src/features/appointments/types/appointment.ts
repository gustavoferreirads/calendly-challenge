export type FindAllPromiseResponse = {
  available_times: string[];
}
  
export type FindAllGetResponse = {
  data: {
    available_times: string[]
  }
}
  
export type FindByFilters = {
  start_date_time?: Date,
  end_date_time?: Date
}