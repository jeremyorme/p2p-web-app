import { Component, Prop, h } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { database } from '../../data/database';

@Component({
  tag: 'business-detail-page',
  styleUrl: 'business-detail-page.css',
  shadow: true,
})
export class BusinessDetailPage {
  @Prop() match: MatchResults;

  render() {
    return (
      <div>
        {['Name', 'Description', 'Icon', 'Url', 'Tel', 'Address'].map(p => <p>
          {p}=<input type="text" value={database.getBusiness(this.match?.params?.key)?.[p.toLowerCase()]} onInput={e => database.setBusiness({[p.toLowerCase()]: (e.target as HTMLInputElement).value})} readonly={database.readonly}/>
        </p>)}
        {['Longitude', 'Latitude'].map(p => <p>
          {p}=<input type="text" value={(database.getBusiness(this.match?.params?.key)?.[p.toLowerCase()] || 0).toString()} onInput={e => database.setBusiness({[p.toLowerCase()]: parseFloat((e.target as HTMLInputElement).value)})} readonly={database.readonly}/>
        </p>)}
      </div>
    );
  }

}
