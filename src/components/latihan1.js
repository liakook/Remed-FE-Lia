import React from 'react'

class Home extends React.Component{
    state = {data : [{
        nama : '',
        usia : '',
        pekerjaan : ''
    }], 
    selectedData : -1}

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        this.setState({data : [] })
    }

    handleEditBtn = (no) => {
        this.setState({selectedData : no})
    }

    handleBtnCancel = () => {
        this.setState({selectedData : -1})
    }

    handleSaveBtn = (no) => {
        var newData = this.refs.editValue.value;
        var arrTemp = [...this.state.data]
        arrTemp[no] = newData
        this.setState({data : arrTemp , selectedData : -1})
    }

    handleBtnDelete = (no) => {
        var arrTemp = [...this.state.data]
        arrTemp.splice(no,1)
        this.setState({data : arrTemp})
    }

    renderState = () => {
        var jsx = this.state.data.map((val,index) => {
            if(this.state.selectedData === index){
            return(
            <tr>
                <th scope="row">{index+1}</th>
                <td> 
                    <input type='text' className="form-control" ref='editValue' defaultValue={val} />
                </td>
                <td> <input type='button' className='btn btn-success' value='Save' onClick={() => {this.handleSaveBtn(index)}}/></td>
                <td> <input type='button' className='btn btn-danger' value='Cancel' onClick={() => {this.handleBtnCancel(index)}}/></td>
            </tr>
            )
        }
        return(
            <tr>
                <th scope="row">{index+1}</th>
                <td> <input type='text' className="form-control" ref='editValue' defaultValue={val} /></td>
                <td> <input type='button' className='btn btn-success' value='Edit' onClick={() => {this.handleEditBtn(index)}}/></td>
                <td> <input type='button' className='btn btn-danger' value='Delete' onClick={() => {this.handleBtnDelete(index)}}/></td>
            </tr>
        )
        }
        )
        return jsx
    }

    handleBtnAdd = () => {
        var nama = this.refs.nama.value
        var usia = this.refs.usia.value
        var pekerjaan = this.refs.pekerjaan.value
        this.setState({data:[...this.state.data , nama,usia,pekerjaan]})
        this.refs.nama.value = ''
        this.refs.usia.value = ''
        this.refs.pekerjaan.value = ''
        // (this.state.data.length + 1)
    }

    handleHapusAll= () => {
        this.setState({data : []})
        // this.state.data()
    }
    hapusAllBtnRender = () => {
        if(this.state.data.length > 0){
            return <input type="button" className="btn btn-default border-primary" value='Hapus All' onClick={this.handleHapusAll} />
        }
    }

    filterPekerjaan = () => {
        var kerjaan = this.refs.filterkerjaan.value
        this.setState({data : kerjaan})
    }

    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select onClick={this.filterPekerjaan} ref='filterkerjaan' className='form-control'>
                            <option>Filter By Pekerjaan</option>
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>Nama</td>
                            <td>Usia</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Nama' ref='nama'/> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Usia' ref='usia'/> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Pekerjaan' ref='pekerjaan'/> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' value='add Data' onClick={this.handleBtnAdd}/> </div>
                    <div className='col-md-4'>
                        <table class="table table-hover">
                        <tbody>

                           {this.renderState()}

                        </tbody>
                        </table>
                            {this.hapusAllBtnRender()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home