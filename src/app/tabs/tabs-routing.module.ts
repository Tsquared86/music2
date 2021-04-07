import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../feed/feed.module').then(m => m.FeedPageModule)
      },
      {
        path: 'music',
        loadChildren: () => import('../music/music.module').then(m => m.MusicPageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('../videos/videos.module').then(m => m.VideosPageModule)
      },
      {
        path: 'lexicon',
        loadChildren: () => import('../lexicon/lexicon.module').then(m => m.LexiconPageModule)
      },
      {
        path: 'music/:title',
        loadChildren: () => import('../album/album.module').then( m => m.AlbumPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/feed',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '', //loads feed page at start
    redirectTo: '/tabs/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
