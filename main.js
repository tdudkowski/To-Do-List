    class Main {
      constructor() {
        this.input = document.getElementById('add');
        this.button = document.querySelector('button');
        this.counter = document.querySelector('div>span');
        this.list = document.querySelector('ul');
        this.inputSearch = document.getElementById('search');

        this.taskList = [];
        this.number = 0;
        this.sendIt();
        this.searchTask();
      }

      // INPUT
      sendIt() {
        this.button.addEventListener('click', () => {
          // e.preventDefault;
          if (this.input.value.length == 0) return;
          const taskName = this.input.value;
          this.addANumber(taskName);
          console.log('send it: ' + taskName);
          this.input.value = "";
        })
      }

      // MAKE A NUMBER
      addANumber(taskName) {
        this.taskElement = {
          number: this.number,
          task: taskName
        }
        this.number++;
        this.addTask();
      }

      // ADD AN ELEMENT
      addTask() {
        this.taskList.push(this.taskElement);
        this.renderList();
      }

      // SHOW LIST
      renderList() {
        this.list.innerHTML = "";
        this.taskList = this.taskList.filter(i => i);
        let that = this;
        this.counter.textContent = this.taskList.length;
        for (let i = 0; i < this.taskList.length; i++) {
          const createdLi = document.createElement('li');
          this.list.appendChild(createdLi);
          createdLi.innerHTML =
            `<span>${this.taskList[i].number+1}. </span> ${this.taskList[i].task} <button data-key="${i}" class="remove">usuń</button>`;
          document.querySelector(`[data-key='${i}']`).addEventListener("click", that.removeElement.bind(this));
        }
      }

      // REMOVE ELEMENT
      removeElement(e) {
        let i = e.target.dataset.key;
        document.querySelector(`[data-key='${[i]}']`).parentNode.remove();
        this.taskList.splice(i, 1);
        console.log(i);
        this.renderList();
      }

      // SEARCH ELEMENT
      searchTask() {
        // let that = this;
        this.inputSearch.addEventListener('input', () => {
          if (this.inputSearch.value.length == 0) this.renderList();
          if (this.taskList.length == 0) return; //delete
          this.taskList = this.taskList.filter(i => i);
          const searchedTxt = this.inputSearch.value.toLowerCase();
          this.list.innerHTML = "";
          for (let i = 0; i < this.taskList.length; i++) {
            if (this.taskList[i].task.toLowerCase().includes(searchedTxt)) {
              const createdLi = document.createElement('li');
              this.list.appendChild(createdLi);
              let that = this;
              createdLi.innerHTML =
                `<span>${this.taskList[i].number+1}. </span> ${this.taskList[i].task} <button data-key="${this.taskList[i].number}" class="remove">usuń</button>`;
              document.querySelector(`[data-key='${this.taskList[i].number}']`).addEventListener("click", () => {
                document.querySelector(`[data-key='${this.taskList[i].number}']`).parentNode.remove();
                delete this.taskList[i];
                this.counter.textContent--;
              });
            }
          }
        });
      }
      // class content ends here
    }

    const main = new Main();