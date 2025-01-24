  import express from "express"
  import bodyParser from "body-parser"

  const app=express()
  const employees=[]

  app.use(bodyParser.urlencoded({extended:true}))
  app.use(express.static("public"))

  app.get("/",(req,res)=>{
    res.render("home.ejs",{employees})
  })

  app.get("/add",(req,res)=>{
    res.render("add.ejs")
  })

  app.get("/edit/:id",(req,res)=>{
    const id=req.params.id
    const employee=employees[id-1]
    res.render("add.ejs",{employee})
  })

  app.get("/view/:id",(req,res)=>{
    const id=req.params.id
    const employee=employees[id-1]
    res.render("view.ejs",{employee})
  })

  app.get("/delete/:id",(req,res)=>{
    const id=req.params.id
    employees.splice(id-1,1)
    res.redirect("/")
  })

  app.post("/add",(req,res)=>{
    const {empId,name,position,salary}=req.body
    const id=employees.length+1
    employees.push({id,empId,name,position,salary})
    res.redirect("/")
  })

  app.post("/edit",(req,res)=>{
    const {id,empId,name,position,salary}=req.body  
    const employee=employees.find((el)=>el.id==id)
    employee.empId=empId || employee.empId
    employee.name=name || employee.name
    employee.position=position || employee.position
    employee.salary=salary || employee.salary
    res.redirect("/")
  })

  app.listen(3000,()=>{
    console.log("Server is running on port 3000")
  })