import React, {Component} from 'react';
import musicmetadata from 'musicmetadata';
import LogoAnimation from "./logo/LogoAnimation";
import Track from "./trackdisplay/TrackDisplay";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.parseMP3Files = this.parseMP3Files.bind(this);
        this.showMetaData = this.showMetaData.bind(this);
    }

    state = {
        response: 'ack',
        tracks: []
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.parseMP3Files(res.express))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('/api/musicfiles');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    parseMP3Files(fileList) {
        for (let i = 0; i < fileList.length; i++) {

            let url = fileList[i];
            console.log("url", url);

            let xhr = new XMLHttpRequest();
            xhr.responseType = "arraybuffer";
            xhr.open("get", escape(url), true);
            xhr.onload = (e) => {
                console.log('response', e.target.response);
                this.showMetaData(e.target.response);
            };
            xhr.send();
        }
    }

    showMetaData(data) {


        musicmetadata(data, (err, result) => {
            if (err) throw err;
            let jsonRes = result;
            console.log(jsonRes);
            let newTrack = <Track
                            title={jsonRes.title}
                            artist={jsonRes.artist}
                            album={jsonRes.album}
                            year={jsonRes.year}

                            />;


            this.setState({
                tracks: [...this.state.tracks, newTrack]
            })
            // if (result.picture.length > 0) {
            //     var picture = result.picture[0];
            //     var url = URL.createObjectURL(new Blob([picture.data], {'type': 'image/' + picture.format}));
            //     var image = document.getElementById('myimg');
            //     image.src = url;
            // }
            // var div = document.getElementById('info');
            // div.innerText = JSON.stringify(result, undefined, 2);
        });
    }


    render() {
        return (
            <div className="App">
                {/*{this.state.response ? <LogoAnimation/> : null}*/}

                <p className="App-intro">{this.state.response || "this is some junk"}</p>

                {this.state.tracks}

            </div>
        );
    }
}

export default App;
