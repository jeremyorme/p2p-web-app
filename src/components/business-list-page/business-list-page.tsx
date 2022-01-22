import { Component, State, h } from '@stencil/core';
import { database } from '../../data/database';

@Component({
  tag: 'business-list-page',
  styleUrl: 'business-list-page.css',
  shadow: true,
})
export class BusinessListPage {
  @State() newBusinessKey: string = 'business-key';

  render() {
    return (
      <div>
        <ul>
          {database.getKeyedBusinesses().map(kb => <li><a href={'./my-business/' + kb.key}>{kb.business.name}</a></li>)}
        </ul>
        <input value={this.newBusinessKey} onInput={e => this.newBusinessKey = (e.target as HTMLInputElement).value}/>
        <a href={'./my-business/' + this.newBusinessKey}>New</a>
      </div>
    );
  }
}