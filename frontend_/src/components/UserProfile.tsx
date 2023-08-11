




// navigate hook
import { useNavigate } from "react-router-dom"

// useSelector
import { useSelector, useDispatch } from "react-redux"

// redux slicer
import { userToStore } from "../Redux/userSlice"

// useQuery
import { useQuery } from "@apollo/client"

// gql
import { USER_SALES } from "../graphql/queries"

// useState, useEffect
import { useState, useEffect } from "react"

// interface for user
interface interfaceForUser {
    username: string,
    id: string
}

// sale interface
interface saleInterface {
    id: string
    price: string
    product: string
    user: string
}



// function to convert object to array
//@ts-ignore
const objectToArray = (sales) => {



    const arrayOfObj = Object.entries(sales).map((e) => ( { [e[0]]: e[1] } ));

    // array of objects
    const array = arrayOfObj[0].userSales


    return array

}





// component
const UserProfile = () => {
    // state for sale
    const [sales, setSales] = useState<saleInterface[]>()

    // state for sales when type array
    const [salesArray, setSalesArray] = useState()


    // @ts-ignore
    const user: interfaceForUser =  useSelector(state => state.user)
    // useDispatch
    const dispatch = useDispatch()
    // navigate
    const navigate = useNavigate()
    const query = useQuery(USER_SALES, {variables: { userSalesId: user.id }})


    // function that makes the query to fetch user sales
    const queryFunction = async () => {

        // making gql query
        const { loading, error, data } = await query

        // sales to state
        await setSales(data)


        

        
    }

    // useEffect that calls function that fetches data
    useEffect(() => {
    
    queryFunction()


    },[])





    // logout function
    const logout = () => {

        const userObject = {
            username: ''
        }

        // user to 
        dispatch(userToStore(userObject))
    }


    // deleteUser route
    const deleteUserRoute = () => {
        const path = "/deleteUser"
        navigate(path)

    }



    // if sales !== undefined calle function
    if (sales !== undefined) {
        // calling object that converts object to array
        const arrayOfSales = objectToArray(sales)


        // setting state
        //@ts-ignore
        setSales(arrayOfSales)
        
        const salesArray = Array.isArray(sales) ? sales : [];

        console.log('sales', salesArray, 'typeof', typeof salesArray)



    }

       return (
        <div>
            {user.username} profile

            <button onClick={logout} >Logout</button>

            <br/>
            <br/>
            <button onClick={deleteUserRoute} >Info for deleting user</button>

            <div> sales query toimii mutta datasciensiä tarvii</div>



        </div>
    )
}



export default UserProfile






