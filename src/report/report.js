class Report extends Polymer.Element {

    constructor() {
        super();
        this.getReports()
            .then(reports => {
                this.reports = reports;
                console.log(`reports: ${this.reports}`)
            });
    }

    static get properties() {
        return {
            employees: {
                type: Array,
                value() {
                    return this.reports;
                }
            }
        };
    }

    static get is() {
        return 'teleport-report';
    }

    getReports() {
        return this.loadEnvironment()
            .then(environment => {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('GET', `http://${environment.host}:${environment.rest_port}/report-backend/resources/reports`, true);
                    request.setRequestHeader('Accept', 'application/json');
                    request.onreadystatechange = () => {
                        let raw = request.responseText;
                        console.log("raw: " + raw);
                        let json = JSON.parse(raw);
                        resolve(json);
                    };
                    request.send();
                });
            });
    }

    loadEnvironment() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'environment/variables.json');
            request.onreadystatechange = () => {
                let raw = request.responseText;
                let json = JSON.parse(raw);
                resolve(json);
            };
            request.send();
        });

        return result;
    }

}

window.customElements.define(Report.is, Report);