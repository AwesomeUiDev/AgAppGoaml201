import { TvAdjustmentValue } from "./TvAdjustmentValue";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class ListDTO
{
    arrayList:TvAdjustmentValue[];
}