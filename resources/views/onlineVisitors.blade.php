@extends('main')

@section('title','Online Visitors Count using Socket.io and React Demo -')


@section('content')
<div  class="uk-container uk-margin"> 
    <div class="uk-grid uk-margin-top uk-flex-center"  data-ukgrid> 
        <div class="uk-width-1-1">
            <h3 class="uk-heading-line uk-text-center uk-text-bold uk-margin m-b-50">
                <span>Online Visitors Count using Socket.io and React Demo</span>
            </h3>
        </div>
      
        <!-- Inject React Online Visitors Table Component --> 
        <div class="uk-width-1-1" id="online-visitors-table" 
            data-url="{{ env('SOCKET','http://localhost:3000/') }}"></div>

    </div>
</div>
    
@stop