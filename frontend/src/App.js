import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [RestaurantName, setRestaurantName] = useState('');
  const [Review, setReview] = useState('');
  const [RestaurantReviewList, setRestaurantReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [searchValue, setSearchValue] = useState('');
  const [ReviewList, setReviewList] = useState([]);
  const [searchmeal, setsearchmeal] = useState('');
  const [MealList, setMealList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setRestaurantReviewList(response.data)
    })
  },[])

  const getmax = (searchmeal) => {
    Axios.patch('http://localhost:3002/api/maxvalue/', {searchmeal: searchmeal}).then((response) => {
          setMealList(response.data)
        })
      };

  const submitReview = () => {
    Axios.post('http://localhost:3002/api/insert', {
      RestaurantName: RestaurantName,
      RestaurantReview: Review
    });


    setRestaurantReviewList([
      ...RestaurantReviewList,
      {
        RestaurantName: RestaurantName,
        RestaurantReview: Review
      },
    ]);
  };

  const searchRes = (searchValue) => {
    Axios.patch('http://localhost:3002/api/search/', {searchValue: searchValue}).then((response) => {
      setRestaurantReviewList(response.data)
    })
  };

  const deleteReview = (RestaurantName) => {
    Axios.delete(`http://localhost:3002/api/delete/${RestaurantName}`);
  };

  const updateReview = (RestaurantName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      RestaurantName: RestaurantName,
      RestaurantReview: newReview
    });
    setNewReview("")
  };

  const longestRevew = () => {
    Axios.get(`http://localhost:3002/api/getLongest`).then((response) => {
      setReviewList(response.data)
    });

    setReviewList([
      ...ReviewList,
      {
        RestaurantName: RestaurantName,
        RestaurantReview: Review
      },
    ]);
  };
//   Axios.get('http://localhost:3002/api/get').then((response) => {
//     setRestaurantReviewList(response.data)
//   })
// },[])
  return (
    <div className="App">
      <h1>Find a Restaurant!</h1>
      <div className="form">
        <label>Restaurant name: </label>
        <input type="text" name="RestaurantSearch" placeholder = "Name" onChange={(e) => {
          setSearchValue(e.target.value)
        } }/>
        <button onClick={() => searchRes(searchValue)}> Search</button>
        
      </div>


      

      <div className="form">
        
              
        {RestaurantReviewList.map((val) => {
          return (
            <div className = "card">
              <h1> {val.name} </h1>
              <p>Restaurant Review: {val.overallRating}</p>
              <p>Price Level: {val.priceLevel}</p>
              <p>Address: {val.streetAddress}, {val.city}, {val.states} {val.postalCode}</p>
              <p>Number: {val.telephone}</p>
              <p>{val.description}</p>
              <p>{val.timeofpub}</p>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              } }/>
              <button onClick={() => {
                updateReview(val.name)
              }}> Rate</button>
              </div>
          );
          
        })}
        <h1>Add a Restaurant!</h1>
        <label>Restaurant Name to modify:</label>
        <input type="text" name="RestaurantName" placeholder = "Name" onChange={(e) => {
          setRestaurantName(e.target.value)
        } }/>
        <label> Rating:</label>
        <input type="text" name="Review" placeholder = "Skip if to delete" onChange={(e) => {
          setReview(e.target.value)
        }}/>

        <button onClick={submitReview}> Submit</button>
        <button onClick={() => { deleteReview(RestaurantName) }}> Delete</button>


      </div>

      <h1>How many meals this Restaurant have?: </h1>
        <input type="text" name="RestaurantSearch" placeholder = "Name" onChange={(e) => {
          setsearchmeal(e.target.value)
        } }/>
        <button onClick={() => getmax(searchmeal)}> Search</button>

      {MealList.map((val) => {
        return (
          <div className = "card">
          <h1> The number of meals in this Restaurant! </h1>
             <p>totally</p >
            <p> {val.count} </p >
            <p> in the </p >
            <p> {val.nameofres} </p >
            <p>!</p >

            </div>
        );

      })}
      {/* <div className="form">
        <h1>Longest Review under each restaurant!</h1>
        <button onClick={longestRevew()}> Show me </button>
        {ReviewList.map((val) => {
          return (
            <div className = "card">
              <h1>{val.name}</h1>
              <p>{val.rating}</p>
              <p>{val.description}</p>

              </div>
          )
        })}
      </div> */}
    </div>
  );
}

export default App;
