'use strict'

class Utulek {

    constructor() {

        const zaznamyUlozenychZvirat = localStorage.getItem("zaznamyZvirat"); // uložení zvířat do uložiště
        this.zaznamyZvirat = zaznamyUlozenychZvirat ? JSON.parse(zaznamyUlozenychZvirat) : [];

        // vytvoření inputů pro jméno, druh, rasu, věk a popis
        this.jmenoInput = document.getElementById("jmeno");
        this.druhInput = document.getElementById("druh");
        this.rasaInput = document.getElementById("rasa");
        this.vekInput = document.getElementById("vek");
        this.popisInput = document.getElementById("popis");

        this.pridatButton = document.getElementById("pridat");
        this.upravitButton = document.getElementById("upravit");
        this.vypisZvire = document.getElementById("seznam-zvirat");

        this._pridejZvire();
    }

    _pridejZvire() { // metoda pro přidání zvířete
        this.pridatButton.onclick = () => { // this zůstane nyní stále this
          
            if (this.jmenoInput.value == "" || this.druhInput.value == "") { // ošetření vstupů
                alert("Musíte vyplnit jméno a druh!");
            } else {
                const zvire = new Zvire(this.jmenoInput.value, this.druhInput.value, this.rasaInput.value, this.vekInput.value, this.popisInput.value);
                this.zaznamyZvirat.push(zvire);
                this.ulozZvire();
                this.vypisZvirata();
            }

        };
    }

    vypisZvirata() { // metoda pro výpis zvířat
        this.vypisZvire.innerHTML = "";
  
        for (const zvire of this.zaznamyZvirat) {
            const seznam = document.createElement("tr");

            seznam.insertAdjacentHTML("beforeend", `<td>${zvire.jmeno}</td><td>${zvire.druh}</td><td>${zvire.rasa || "neuvedeno"}</td><td>${zvire.vek || "neuvedeno"}</td><td>${zvire.popis || "neuvedeno"}</td>`);
            const smazRadkuButton = document.createElement("td");
            seznam.appendChild(smazRadkuButton);

            const smazButton = document.createElement("button");
            smazButton.onclick = () => { // Tlačítko se zeptá a poté odstraní záznam.
                if (confirm(`Opravdu si přejete toto zvíře odstranit ze seznamu?`)) {
                    this.zaznamyZvirat = this.zaznamyZvirat.filter(z => z !== zvire);
                    this.ulozZvire();
                    this.vypisZvirata();
                }
            }
            smazButton.innerText = "Smazat zvíře ze seznamu";
            smazButton.className = "btn btn-light";
            smazRadkuButton.appendChild(smazButton);

            const upravButton = document.createElement("button");
            upravButton.onclick = () => {
                this.pridatButton.style.display = "none";
                this.upravitButton.style.display = "block";

                // Zobrazení uloženého záznamu zvoleného zvířete ve formuláři.
                this.jmenoInput.value = zvire.jmeno;
                this.druhInput.value = zvire.druh;
                this.rasaInput.value = zvire.rasa;
                this.vekInput.value = zvire.vek;
                this.popisInput.value = zvire.popis;

                this.upravitButton.onclick = () => {
                    // Přepsání hodnot daného zvířete.
                    zvire.jmeno = this.jmenoInput.value;
                    zvire.druh = this.druhInput.value;
                    zvire.rasa = this.rasaInput.value;
                    zvire.vek = this.vekInput.value;
                    zvire.popis = this.popisInput.value;
                
                    this.ulozZvire();
                    this.vypisZvirata();
                    this.pridatButton.style.display = "block";
                    this.upravitButton.style.display = "none";
                }

            }
            upravButton.innerText = "Upravit zvíře ze seznamu";
            upravButton.className = "btn btn-light";
            smazRadkuButton.appendChild(upravButton);

            seznam.insertAdjacentHTML("beforeend", "</tr>");
            this.vypisZvire.appendChild(seznam);
        }
    }

    ulozZvire() { // metoda pro uložení

		localStorage.setItem("zaznamyZvirat", JSON.stringify(this.zaznamyZvirat)); // parsování
	}

}