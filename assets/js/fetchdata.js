
let formeddata = [];

let nblist = 0;



async function fetchdata(){

    const data = await fetch('http://localhost:5000/lists');

     formeddata = await data.json();

    // console.log(formeddata);

    nblist=formeddata.length;

formeddata.map(list => {

    // console.log(list);

    let addlisttemplate = document.querySelector('#list-template');
    
    let newlist = addlisttemplate.content.cloneNode(true);
    
    newlist.querySelector('[slot="list-name"]').textContent = list.name;

    newlist.querySelector('[slot="list-id"]').dataset.id = list.id;

    // console.log(newlist.querySelector('[slot="list-id"]'));

    let parent = document.querySelector('#lists-container');

    parent.appendChild(newlist);


    list.cards.map(task => {

        // console.log(list);

        let addtasktemplate = document.querySelector('#task-template');

        let newtask = addtasktemplate.content.cloneNode(true);

        newtask.querySelector('[slot="task-name"]').textContent = task.content;

        newtask.querySelector('[slot="task-name"]').dataset.id = task.id;

        newtask.querySelector('[slot="task-name"]').dataset.color = task.color;

        // console.log(newtask.querySelector('.card'));

        // console.log(newtask.querySelector('[slot="task-name"]').dataset.id );

        newtask.querySelector('.card').style.backgroundColor = task.color;
    
        let parents = document.querySelectorAll('.message.is-info');

        for (parent of parents) (listoflist.push(parent));

        trueparent = listoflist[listoflist.length-1];

    

        trueparent.appendChild(newtask);

        // console.log(trueparent);

        listoflist = [];

      

    });



})


updateicon();
listenremoving();

}

fetchdata();







