class Report extends Polymer.Element {

    constructor() {
        super();
        this.getReports()
            .then(reports => {
                this.greetings = "Hello, it seems to work";
                for (const report of reports) {
                    this.greetings += `, ${report.acceptedRoutes} ${report.completedRoutes}`;
                }
            });
    }

    static get properties() {
        return {
            message: {
                type: String,
                value: '--not set--'
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