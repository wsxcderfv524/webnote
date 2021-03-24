<!--
 * @Author: shenjianfei
 * @Date: 2021-03-17 14:40:44
 * @LastEditors: shenjianfei
 * @LastEditTime: 2021-03-22 09:30:20
-->
### 组件

#### 受控组件和非受控组件的区别
受控组件：在html中，标签 input,select等值的改变通常是根据用户输入进行更新。在React中，可变状态通常保存在组件的状态属性中，并且只能使用 setState() 更新，而呈现表单的React组件也控制着在后续用户输入时该表单中发生的情况，以这种由React控制的输入表单元素而改变其值的方式，称为：“受控组件”
```
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
    };

    render() {
        return (
            <div>
                <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
            </div>
        );
    }
}
```
非受控组件：表单数据由DOM本身处理。即不受setState()的控制，与传统的HTML表单输入相似，input输入值即显示最新值（使用 ref从DOM获取表单值）
```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

```
尽管非受控组件通常更易于实现，因为只需使用refs即可从 DOM 中获取值，但通常建议优先选择受控制的组件，而不是非受控制的组件。

这样做的主要原因是受控组件支持即时字段验证，允许有条件地禁用/启用按钮，强制输入格式。