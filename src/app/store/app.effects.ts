import {EffectsModule} from "@ngrx/effects";
import {SearchEffects} from "./effects/search.effects";
import {UserEffects} from "./effects/user.effects";
import {RepoEffects} from "./effects/repo.effects";

export const appEffects = [
  EffectsModule.run(SearchEffects),
  EffectsModule.run(UserEffects),
  EffectsModule.run(RepoEffects)
];
