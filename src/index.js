let toursGroup = document.getElementById("toursGroup");

const apiUrl = 'http://localhost:8080/packets';

let cart = []

let index = 0
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then(data => {
        let str = ''
        for (let i in data) {
            str += `
                <div class="col-md-4">
                
                    <div class="mu-featured-tours-single">
                    <img src="../images/${data[i].title}.png" alt="img">
<button type="button" class="btn btn-secondary m-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
  See the locations
</button>
                    <div class="mu-featured-tours-single-info">
                    <h3>${data[i].title}</h3>
                    <h4>${data[i].days}</h4>
                    <span class="mu-price-tag">$${data[i].price}</span>
                    <p>${data[i].description}</p>
                    

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Locations from - to</h1>
                                <button onclick="seeLocationTour(${i})" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              
                              <div class="modal-body">
                                <h4>From:</h4>
                                <iframe src="https://www.google.com/maps/embed?pb=${data[index].maps.from}" width="350" height="120" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                <h4>To:</h4>
                                <iframe src="https://www.google.com/maps/embed?pb=${data[index].maps.to}" width="350" height="120" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                    <h4> ${data[index].km} </h4>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                            </div>
                          </div>
                        </div>
                    
                    <button onclick="bookTour(${i})" href="#" class="mu-book-now-btn btn btn-outline-success">Book Now</button>
                    </div>
                    </div>
                    </div>
            `
        }
        toursGroup.innerHTML += str
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });


function bookTour(i) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            alert("Tour booked successfully. Please wait we will call you! Booked tour: "+data[i].title)
            cart.push(data[i])

            localStorage.setItem("tours", JSON.stringify(cart))
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}

function seeLocationTour(i){
    index = i
}