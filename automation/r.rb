require 'nokogiri'
require 'json'
require 'date'

parser = Nokogiri::HTML(File.read('./table.html'))

col = []
converter = {
    'Feb' => '2',
    'Mar' => '3',
    'Apr' => '4'
}

parser.css('mat-row.mat-row.ng-star-inserted').each { |el|
 


    email = el.css('.auth-user-identifier-content').css('.identifier-text.ng-star-inserted')[0].text.strip
    created = el.css('.cdk-column-created-at').text.strip
    uuid = el.css('.cdk-column-uid').text.strip
    created = created.gsub(',', '')
    month, day, year = created.split(' ')
    month = converter[month]


    timestamp = Date.new(year.to_i,month.to_i,day.to_i).to_time.to_i


    data = {
        'email' => email,
        'created' => timestamp,
        'uuid' => uuid
    }

    
    
    col << data
}


File.open('./dump.json', 'w+') { |f| f.puts JSON.pretty_generate(col)}