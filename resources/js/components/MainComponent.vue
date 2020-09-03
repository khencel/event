<template>
    <div>
        <div class="card">
            <div class="card-header bg-white">
                Calendar
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div>
                            <label for="">Event</label>
                            <input type="text" v-model="form.event" class="form-control">
                        </div>
                        
                        <div class="row mt-2">
                            <div class="col-md-6">
                                <label for="">From</label>
                                <input type="date" v-model="form.from" class="form-control">    
                            </div>

                            <div class="col-md-6">
                                <label for="">To</label>
                                <input type="date" v-model="form.to" class="form-control">    
                            </div>
                        </div>
                        
                        <div class="row ml-1 mt-2">
                            <div v-for="(weekDay, index) in weekDays" :key="index"  class="" style="width:13%;">
                                <input type="checkbox" v-model="form.weekday" :value="weekDay.value">{{weekDay.name}}
                            </div>
                        </div>
                        <div>
                            <button class="btn btn-primary" @click="btnSave">Save</button>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <h2>{{month}} {{year}}</h2>
                       
                            <table class="table table-hover" id="event">
                                    <tr v-for="(calendar_day, index) in calendar_days" :key="index" :id="index">
                                        <td>
                                            {{calendar_day.day}} {{calendar_day.weekday}}
                                        </td>
                                        <td v-if="calendar_day.day >= new Date(form.from).getDate() && calendar_day.day <= new Date(form.to).getDate()">
                                            <span  v-for="item in form.weekday" :key="item" v-show="calendar_day.value == item">
                                                {{form.event}}
                                            </span>
                                        </td>
                                        <td v-else>

                                        </td>
                                    </tr>
                            </table>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                weekDays:[
                    {
                        name:'Mon',
                        value:1
                    },

                    {
                        name:'Tue',
                        value:2
                    },

                    {
                        name:'Wed',
                        value:3
                    },

                    {
                        name:'Thu',
                        value:4
                    },

                    {
                        name:'Fri',
                        value:5
                    },

                    {
                        name:'Sat',
                        value:6
                    },

                    {
                        name:'Sun',
                        value:0
                    },
                ],
                month:'',
                year:'',
                curDate: new Date(),
                calendar_days:[],
                form:new Form({
                    event:'',
                    from:'',
                    to:'',
                    weekday:[],
                    eventIndex:[],
                }),
            }
        },
        mounted() {
            this.calendar();
            this.loadEvent();
            this.sample();
        },

        methods:{
            btnSave(){
                this.form.post('api/event')
                .then(response =>{
                    
                });
            },

            calendar(){
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

                var date = this.curDate;
                var month = date.getMonth();
                this.month = months[month];
                var year = date.getFullYear();
                this.year = year;
                var end = new Date(year,month + 1, 0).getDate();
                var i = 1;
                
                while(i != end+1){
                    var numb = new Date(months[date.getMonth()]+i+" "+year).getDate();
                    var weekdays = new Date(months[date.getMonth()]+i+" "+year).getDay();
                    this.calendar_days.push(
                        {
                            day:numb,
                            weekday: days[weekdays],
                            value: weekdays,
                        }
                    );
                    i++
                }                
            },

            loadEvent(){
                axios.get('api/event')
                .then(response => {
                    this.form.event = response.data.event;
                    this.form.from =  response.data.from;
                    this.form.to =  response.data.to;
                    response.data.weekday == null?'':response.data.weekday.split(',').forEach(element => {
                        this.form.weekday.push(element)
                    });
                });
            },

            sample(){
                $(document).ready(function(){
                    var l = $('#event').children(0);
                    // $('#event').children(0)[0].bgColor = "blue";
                    
                    for(var x=0;x<l.length;x++){
                        var text = $('#event').children(0)[x].children[1].innerText;
                        if(text != ''){
                            $('#event').children(0)[x].bgColor = "green"
                        }
                    }
                    
                });
            }

            

        }
    }
</script>
