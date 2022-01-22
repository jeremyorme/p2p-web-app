import { Component, h } from '@stencil/core';
import { database } from '../../data/database';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {

  componentWillLoad() {
    return database.init();
  }

  render() {
    return (
      <div>
        <header>
          <h1>Business Directory</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="business-list-page" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" />
              <stencil-route url="/my-business/:key/" component="business-detail-page" />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
