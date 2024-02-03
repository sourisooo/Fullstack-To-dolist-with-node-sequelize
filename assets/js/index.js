let lastparent = '';
let lastmodal = '';
let listoflist = [];
let lastid = '';
let lastlistid= '';
let dragid = '';
let dragoutdated = {};
let dragupdated = {};
let listoudated = '';
let listupdated = '';


function updateicon(){

let cards = document.querySelectorAll('.icon.is-clickable');

// console.log(cards, typeof cards);

let openmodal = cards.forEach( card => {
    
    card.addEventListener('click', () => {

    let modal = document.querySelector('#add-list-modal');

    modal.classList.add('is-active');

    console.log(card.parentElement);

    lastparent = card.parentElement.innerText;

    lastmodal = 'task';



});});


let closebutton = document.querySelectorAll('.delete.close');

let annulerbutton = document.querySelectorAll('.button.close');

console.log(closebutton);   

let closeModal = closebutton.forEach(e => {

    e.addEventListener('click', () => {

        let modals = document.querySelectorAll('.modal');
    
        // console.log(modals);
    
        modals.forEach(modal => {
    
            modal.classList.remove('is-active');
    
        })
    
    })

});


let annuleModal = annulerbutton.forEach(e => {


    e.addEventListener('click', () => {

        let modals = document.querySelectorAll('.modal');
    
        // console.log(modals);
    
        modals.forEach(modal => {
    
            modal.classList.remove('is-active');
    
        })
        
       })

});

let listbutton = document.querySelector('.button.is-large.is-fullwidth');

// console.log(listbutton);


let openmodalbylist = 
    
    listbutton.addEventListener('click', () => {

    let modal = document.querySelector('#add-list-modal2');

    modal.classList.add('is-active');

    lastparent = modal.parentElement.innerText;

    lastmodal = 'list';

    // console.log(lastmodal);

    // console.log(card.parentElement.innerText=="Perso");


});


let colorbutton = document.querySelectorAll('.icon.has-text-success');

// console.log(colorbutton);

 colorbutton.forEach(e => {e.addEventListener('click', (click) => {

    // console.log(click.target.parentNode.parentNode.parentNode.parentNode.querySelector('[slot="task-name"]').dataset.id);

    // console.log(click.target.parentElement.parentElement.parentElement.parentElement.innerText);

    // console.log(click.target.parentElement.parentElement.parentElement.parentElement.style.backgroundColor);

    let modal = document.querySelector('#add-list-modal3');

    modal.classList.add('is-active');

    
    lastparent = click.target.parentNode.parentNode.parentNode.parentNode;

    console.log(click.target);

    lastmodal = 'color';

    lastid = click.target.parentNode.parentNode.parentNode.parentNode.querySelector('[slot="task-name"]').dataset.id;

    let canvas = document.querySelector('canvas');
    console.log(canvas);
    let ctx = canvas.getContext('2d');

    let image = new Image();
    image.onload = () => {
    ctx.drawImage(image, 0, -50);};

    image.src = './assets/image/palette.jfif';

    canvas.addEventListener('click',  (event) => {
        let x = event.offsetX;
        let y = event.offsetY;
  
        let imageData = ctx.getImageData(x, y, 1, 1);
        let data = imageData.data;
  
        let red = data[0];
        let green = data[1];
        let blue = data[2];
  
        let hexColor = '#' + red.toString(16) + green.toString(16) + blue.toString(16);

        lastparent.style.backgroundColor = hexColor;

        console.log(lastparent);


});


})
});


let cardtodrag = document.querySelectorAll('.card');

console.log(cardtodrag);

cardtodrag.forEach(e => {

    e.addEventListener('mousedown', (event) => { 
        
        lastid = event.target.dataset.id;

        lastmodal = 'drag';

        dragoutdated = {color: event.target.dataset.color, list_id: parseInt(event.target.parentElement.parentElement.parentElement.dataset.id), content: event.target.textContent  }

        listoudated = parseInt(event.target.parentElement.parentElement.parentElement.dataset.id);

        // console.log(event.target.dataset.color, event.target.parentElement.parentElement.parentElement.dataset.id, event.target.textContent  );

        // console.log(event.target.parentElement.parentElement.parentElement.dataset.id);

        console.log(event.target.textContent );

        console.log(dragoutdated);

    })


})

let listtodragin = document.querySelectorAll('.message.is-info');

console.log(listtodragin);

listtodragin.forEach( e => {

e.addEventListener('mouseup', async (event) => {

    lastlistid = event.target.parentElement.parentElement.dataset.id;

    console.log(lastlistid);

    let httpResponse = await fetch(`http://localhost:5000/cards/${parseInt(lastid)}`, {
        method: "PATCH",
        body: JSON.stringify({ list_id: parseInt(lastlistid) }),
        headers: { "Content-Type": "application/json" }
      });
      let body = await httpResponse.json();

      console.log(body);

      if(lastmodal=='drag'){  window.location.reload();};


    });

    })


let cardtodragin = document.querySelectorAll('.card')

console.log(cardtodragin)

cardtodragin.forEach( e => {

    e.addEventListener('mouseup', async (event) => {

        dragid = event.target.parentElement.parentElement.querySelector('[slot="task-name"]').dataset.id;

        dragupdated = {color: event.target.dataset.color, list_id: parseInt(event.target.parentElement.parentElement.parentElement.dataset.id), content: event.target.textContent  }

        listupdated = parseInt(event.target.parentElement.parentElement.parentElement.dataset.id);

        dragupdated.list_id = listoudated;

        dragoutdated.list_id = listupdated;
        
        console.log(dragupdated );
    
        let httpResponse = await fetch(`http://localhost:5000/cards/${parseInt(lastid)}`, {
            method: "PATCH",
            body: JSON.stringify(dragupdated),
            headers: { "Content-Type": "application/json" }
          });
          let body = await httpResponse.json();
    
          console.log(body);

          let httpResponse2 = await fetch(`http://localhost:5000/cards/${parseInt(dragid)}`, {
            method: "PATCH",
            body: JSON.stringify(dragoutdated),
            headers: { "Content-Type": "application/json" }
          });
          let body2 = await httpResponse2.json();
    
          console.log(body2);
    
          if(lastmodal=='drag'){  window.location.reload();};
    
    
        });

})


    }


updateicon();


function listenadding(){

let addbuttons = document.querySelectorAll('.button.is-success')

// console.log(addbuttons);

let addtask = addbuttons.forEach(button => {
    
    button.addEventListener('click', async (click) => {

        click.preventDefault();

        // console.log(click.parentNode);

        // console.log(click.target.form[1].value);

        if(lastmodal==='task'){

        let addtasktemplate = document.querySelector('#task-template');
        
        let parents = document.querySelectorAll('.message.is-info');

        for (parent of parents) (listoflist.push(parent));

        // console.log(listoflist);

        // console.log(parents);

        trueparent = listoflist.filter(parent => parent.children[0].innerText == lastparent)

        // console.log( Object.fromEntries(new FormData(document.querySelector("#add-list-modal form"))));

        // console.log(trueparent);
            // console.log(lastmodal);

      
            
            let newtask = addtasktemplate.content.cloneNode(true);

            newtask.querySelector('[slot="task-name"]').textContent = click.target.form[1].value;

            trueparent[0].appendChild(newtask);

            // let id = Math.random()*10000;

            console.log(trueparent[0].dataset.id);

            let listid = trueparent[0].dataset.id;

            const httpResponse = await fetch(`http://localhost:5000/cards/`, {
                method: "POST",
                body: JSON.stringify({ content:click.target.form[1].value, list_id:listid  }),
                headers: { "Content-Type": "application/json" }
              });
              const body = await httpResponse.json();
        
              console.log(body);


        listoflist = [];


            fetchdata();

            window.location.reload();

    
            } 
        
        else if (lastmodal==='list'){


            let addlisttemplate = document.querySelector('#list-template');

            // console.log(addlisttemplate);

            let newlist = addlisttemplate.content.cloneNode(true);
    
            newlist.querySelector('[slot="list-name"]').textContent = click.target.form[1].value;

            console.log(nblist);

            let id = nblist+1;

            newlist.querySelector('[slot="list-id"]').dataset.id = id;
    
            // Object.fromEntries(new FormData(document.querySelector("#add-list-modal form"))).list_id.textContent = id;

            let parent = document.querySelector('#lists-container')

            // console.log(lastmodal);

            parent.appendChild(newlist);

            const httpResponse = await fetch('http://localhost:5000/lists', {
                method: "POST",
                body: JSON.stringify({ name:click.target.form[1].value, position:id }),
                headers: { "Content-Type": "application/json" }
              });
              const body = await httpResponse.json();
        
            //   console.log(body);


            cards = document.querySelectorAll('.icon.is-clickable');

            // console.log(cards);

            window.location.reload();

              updateicon();

        } else if(lastmodal=='color'){

            
            console.log(lastid);
            console.log(lastparent.style.backgroundColor);


        const httpResponse = await fetch(`http://localhost:5000/cards/${parseInt(lastid)}`, {
            method: "PUT",
            body: JSON.stringify({ color: lastparent.style.backgroundColor }),
            headers: { "Content-Type": "application/json" }
          });
          const body = await httpResponse.json();

          window.location.reload();

        } 

});})

}

listenadding();



function listenremoving(){

let deletebutton = document.querySelectorAll('.icon.has-text-danger');

let deletetask = deletebutton.forEach(button => {

    button.addEventListener('click', async () => {


        console.log(button.parentNode.parentNode.querySelector('[slot="task-name"]').dataset.id);

        // button.parentElement.parentElement.innerHTML = '';
        

        await fetch(`http://localhost:5000/cards/${parseInt(button.parentNode.parentNode.querySelector('[slot="task-name"]').dataset.id)}`, { method: "DELETE"});

        button.parentNode.parentNode.parentNode.removeChild( button.parentNode.parentNode);
    })

    // console.log(button.parentElement.parentElement.innerHTML);
    

});


let deletelistbutton = document.querySelectorAll('.delete')

let deletelist = deletelistbutton.forEach(button => {

    button.addEventListener('click', async () => {

        console.log(button.parentNode.parentNode.dataset.id, typeof button.parentNode.parentNode.dataset.id);

        await fetch(`http://localhost:5000/lists/${parseInt(button.parentNode.parentNode.dataset.id)}`, { method: "DELETE"});

        button.parentNode.parentNode.parentNode.removeChild( button.parentNode.parentNode);
   
       

    })

    // console.log(button.parentNode.parentNode);
    // console.log(button.parentElement.parentElement.innerHTML );
    // console.log(document.querySelectorAll('.message.is-info'));


})};


listenremoving();
