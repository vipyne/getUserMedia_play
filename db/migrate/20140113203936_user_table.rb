class UserTable < ActiveRecord::Migration
  def change
    create_table :user do |t|
      t.string :name

      t.timestamps
    end
  end
end
