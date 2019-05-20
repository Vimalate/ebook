const book={
    state:{
        test:1
    },
    mutations:{
        'SRT_TEST':(state, newTest)=>{
            state.test=newTest
        }
        
    },
    actions:{
        setTest:({commit,state}, newTest)=>{
            // console.log(state.test,newTest)
            return commit('SRT_TEST',newTest)
        }
    },
    
}
export default book